import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../core/enums';
import { SearchPaginationResponseModel } from '../../core/models';
import { formatResponse } from '../../core/utils';
import CreateRoleDto from './dtos/createRole.dto';
import SearchWithPaginationDto from './dtos/searchWithPagination.dto';
import UpdateRoleDto from './dtos/updateRole.dto';
import { IRole } from './role.interface';
import RoleService from './role.service';

export default class RoleController {
    private roleService = new RoleService();

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: CreateRoleDto = req.body;
            const item: IRole = await this.roleService.create(model);
            res.status(HttpStatus.Created).json(formatResponse<IRole>(item));
        } catch (error) {
            next(error);
        }
    };

    public getItems = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: SearchWithPaginationDto = req.body;
            const result: SearchPaginationResponseModel<IRole> = await this.roleService.getItems(model);
            res.status(HttpStatus.Success).json(formatResponse<SearchPaginationResponseModel<IRole>>(result));
        } catch (error) {
            next(error);
        }
    };

    public getItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const item: IRole = await this.roleService.getItemById(req.params.id);
            res.status(HttpStatus.Success).json(formatResponse<IRole>(item));
        } catch (error) {
            next(error);
        }
    };

    public updateItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: UpdateRoleDto = req.body;
            const item: IRole = await this.roleService.updateItem(req.params.id, model);
            res.status(HttpStatus.Success).json(formatResponse<IRole>(item));
        } catch (error) {
            next(error);
        }
    };

    public deleteItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.roleService.deleteItem(req.params.id);
            res.status(HttpStatus.Success).json(formatResponse<null>(null));
        } catch (error) {
            next(error);
        }
    };
}
