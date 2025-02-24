import { HttpStatus } from '../../core/enums';
import { HttpException } from '../../core/exceptions';
import { IError } from '../../core/interfaces';
import { SearchPaginationResponseModel } from '../../core/models';
import { compareDate } from '../../core/utils';
import { formatSearchPaginationResponse } from '../../core/utils/service';
import { DataStoredInToken } from '../auth';
import CreateProjectDto from './dtos/create.dto';
import SearchPaginationProjectDto from './dtos/searchPagination.dto';
import UpdateProjectStatusDto from './dtos/updateStatus.dto';
import { VALID_STATUS_CHANGE_PAIRS } from './project.constant';
import { ProjectStatusEnum } from './project.enum';
import { IProject } from './project.interface';
import { ProjectRepository } from './project.repositoty';

export default class ProjectService {
    private projectRepository = new ProjectRepository();

    public async create(model: CreateProjectDto, loggedUser: DataStoredInToken): Promise<IProject> {
        const { project_members } = model;

        let errorResults: IError[] = [];

        // check project_code, project_name valid
        errorResults = await this.projectRepository.checkFieldsExists(
            [
                { fieldName: 'project_code', fieldValue: model.project_code },
                { fieldName: 'project_name', fieldValue: model.project_name },
            ],
            errorResults,
            'Project',
        );

        if (!project_members || !project_members.length) {
            errorResults.push({
                message: 'The project needs at least one member!',
                field: 'project_members',
            });
        }

        model.updated_by = loggedUser.id || 'admin';
        model.project_status = ProjectStatusEnum.NEW;

        // check all fields valid
        if (errorResults.length) {
            throw new HttpException(HttpStatus.BadRequest, '', errorResults);
        }

        // create new item
        const newItem = await this.projectRepository.create(model);
        if (!newItem) {
            throw new HttpException(HttpStatus.Accepted, 'Create project failed!');
        }
        return newItem;
    }

    public async getItems(model: SearchPaginationProjectDto): Promise<SearchPaginationResponseModel<IProject>> {
        const { project_start_date, project_end_date } = model.searchCondition;

        if (project_start_date && project_end_date) {
            await compareDate(project_start_date, project_end_date);
        }

        const { data, total } = await this.projectRepository.getItems(model);
        return formatSearchPaginationResponse(data, {
            ...model.pageInfo,
            totalItems: total,
            totalPages: 0,
        });
    }

    public async getItem(id: string): Promise<IProject> {
        const items = await this.projectRepository.getItemDetail(id);

        if (!items.length) {
            throw new HttpException(HttpStatus.BadRequest, `Project info is not exists.`);
        }

        return items[0];
    }

    public async update(id: string, model: CreateProjectDto, loggedUser: DataStoredInToken): Promise<IProject> {
        // check item exists
        const itemExist = await this.getItem(id);

        let errorResults: IError[] = [];

        const { project_members } = model;

        // check project_code valid
        if (itemExist.project_code !== model.project_code) {
            errorResults = await this.projectRepository.checkFieldsExists(
                [{ fieldName: 'project_code', fieldValue: model.project_code }],
                errorResults,
                'Project',
            );
        }

        // check project_name valid
        if (itemExist.project_name !== model.project_name) {
            errorResults = await this.projectRepository.checkFieldsExists(
                [{ fieldName: 'project_name', fieldValue: model.project_name }],
                errorResults,
                'Project',
            );
        }

        if (!project_members.length) {
            errorResults.push({
                message: 'The project needs at least one member!',
                field: 'project_members',
            });
        }

        // check all fields valid
        if (errorResults.length) {
            throw new HttpException(HttpStatus.BadRequest, '', errorResults);
        }

        const updateData = {
            ...model,
            updated_by: loggedUser.id,
            updated_at: new Date(),
        };

        const updatedItem = await this.projectRepository.update(id, updateData);
        if (!updatedItem) {
            throw new HttpException(HttpStatus.BadRequest, 'Update project info failed!');
        }
        return this.getItem(id);
    }

    // TODO: check claim request
    public async delete(id: string): Promise<boolean> {
        // check item exists
        await this.getItem(id);

        const updatedItem = await this.projectRepository.delete(id);

        if (!updatedItem.acknowledged) {
            throw new HttpException(HttpStatus.BadRequest, 'Delete item failed!');
        }

        return true;
    }

    public async updateStatus(model: UpdateProjectStatusDto, loggedUser: DataStoredInToken): Promise<boolean> {
        const { project_id, project_status } = model;

        // check item exists
        const item = await this.getItem(project_id);

        const old_status = item.project_status;
        const new_status = project_status;

        if (old_status === new_status) {
            throw new HttpException(HttpStatus.BadRequest, `This Project has already with status is ${old_status}`);
        }

        const isValidChangeStatus = VALID_STATUS_CHANGE_PAIRS.some(
            (pair) => pair[0] === old_status && pair[1] === new_status,
        );

        if (!isValidChangeStatus) {
            throw new HttpException(
                HttpStatus.BadRequest,
                `Invalid status change. Current status: ${old_status} -> ${new_status}`,
            );
        }

        model.updated_by = loggedUser.id;

        const updatedItem = await this.projectRepository.updateStatus(model);

        if (!updatedItem.acknowledged) {
            throw new HttpException(HttpStatus.BadRequest, 'Update status item failed!');
        }

        return true;
    }
}
