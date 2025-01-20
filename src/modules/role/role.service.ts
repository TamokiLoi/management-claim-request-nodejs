import { HttpStatus } from '../../core/enums';
import { HttpException } from '../../core/exceptions';
import { IError } from '../../core/interfaces';
import { SearchPaginationResponseModel } from '../../core/models';
import { checkFieldsExists, isEmptyObject } from '../../core/utils';
import CreateRoleDto from './dtos/createRole.dto';
import SearchRoleDto from './dtos/search.dto';
import SearchWithPaginationDto from './dtos/searchWithPagination.dto';
import UpdateRoleDto from './dtos/updateRole.dto';
import { IRole } from './role.interface';
import RoleSchema from './role.model';

export default class RoleService {
    public roleSchema = RoleSchema;

    public async create(model: CreateRoleDto): Promise<IRole> {
        if (isEmptyObject(model)) {
            throw new HttpException(HttpStatus.BadRequest, 'Model data is empty');
        }

        let errorResults: IError[] = [];

        // check role_code, role_name valid
        errorResults = await checkFieldsExists(
            this.roleSchema,
            [
                { fieldName: 'role_code', fieldValue: model.role_code },
                { fieldName: 'role_name', fieldValue: model.role_name },
            ],
            errorResults,
            'Role',
        );

        // check all fields valid
        if (errorResults.length) {
            throw new HttpException(HttpStatus.BadRequest, '', errorResults);
        }

        const createdItem: IRole = await this.roleSchema.create(model);
        if (!createdItem) {
            throw new HttpException(HttpStatus.Accepted, `Create role failed!`);
        }
        return createdItem;
    }

    public async getAllItems(keyword: string): Promise<IRole[]> {
        let query = {};
        if (keyword) {
            const keywordValue = keyword.toLowerCase().trim();
            query = {
                $or: [
                    { role_code: { $regex: keywordValue, $options: 'i' } },
                    { role_name: { $regex: keywordValue, $options: 'i' } },
                ],
            };
        }

        query = {
            ...query,
            is_deleted: false,
        };

        const result = await this.roleSchema.find(query).exec();

        return result || [];
    }

    public async getItems(model: SearchWithPaginationDto): Promise<SearchPaginationResponseModel<IRole>> {
        const searchCondition = { ...new SearchRoleDto(), ...model.searchCondition };
        const { role_code, role_name, is_deleted } = searchCondition;
        const { pageNum, pageSize } = model.pageInfo;

        let query = {};
        if (role_code) {
            query = {
                role_code: { $regex: role_code.toLowerCase().trim(), $options: 'i' },
            };
        }

        if (role_name) {
            query = {
                role_name: { $regex: role_name.toLowerCase().trim(), $options: 'i' },
            };
        }

        query = {
            ...query,
            is_deleted,
        };

        const resultQuery = await this.roleSchema
            .find(query)
            .sort({ updated_at: -1 })
            .skip((pageNum - 1) * pageSize)
            .limit(pageSize)
            .exec();

        const rowCount = await this.roleSchema.find(query).countDocuments().exec();
        const result = new SearchPaginationResponseModel<IRole>();
        result.pageInfo.pageNum = pageNum;
        result.pageInfo.pageSize = pageSize;
        if (rowCount > 0) {
            result.pageData = resultQuery;
            result.pageInfo.totalItems = rowCount;
            result.pageInfo.totalPages = Math.ceil(rowCount / pageSize);
        }

        return result;
    }

    public async getItemById(id: string): Promise<IRole> {
        const detail = await this.roleSchema.findOne({ _id: id, is_deleted: false }).lean();
        if (!detail) {
            throw new HttpException(HttpStatus.BadRequest, `Role is not exists.`);
        }
        return detail;
    }

    public async updateItem(id: string, model: UpdateRoleDto): Promise<IRole> {
        if (isEmptyObject(model)) {
            throw new HttpException(HttpStatus.BadRequest, 'Model data is empty');
        }

        const updateData = {
            role_name: model.role_name,
            description: model.description,
            updated_at: new Date(),
        };

        const updatedItem = await this.roleSchema.updateOne({ _id: id }, updateData);
        if (!updatedItem.acknowledged) {
            throw new HttpException(HttpStatus.BadRequest, 'Update item failed!');
        }
        const result = await this.getItemById(id);
        return result;
    }

    public async deleteItem(id: string): Promise<boolean> {
        const detail = await this.getItemById(id);
        if (!detail || detail.is_deleted) {
            throw new HttpException(HttpStatus.BadRequest, `Item is not exists.`);
        }

        const updatedItem = await this.roleSchema.updateOne({ _id: id }, { is_deleted: true, updated_at: new Date() });

        if (!updatedItem.acknowledged) {
            throw new HttpException(HttpStatus.BadRequest, 'Delete item failed!');
        }

        return true;
    }
}
