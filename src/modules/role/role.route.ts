import { Router } from 'express';
import { API_PATH } from '../../core/constants';
import { IRoute } from '../../core/interfaces';
import { validationMiddleware } from '../../core/middleware';
import CreateRoleDto from './dtos/createRole.dto';
import SearchWithPaginationDto from './dtos/searchWithPagination.dto';
import UpdateRoleDto from './dtos/updateRole.dto';
import RoleController from './role.controller';

export default class RoleRoute implements IRoute {
    public path = API_PATH.ROLES;
    public router = Router();
    public roleController = new RoleController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // POST domain:/api/roles -> create new item
        this.router.post(this.path, validationMiddleware(CreateRoleDto), this.roleController.create);

        // POST domain:/api/roles/search -> Get all items
        this.router.post(
            API_PATH.SEARCH_ROLES,
            // authMiddleWare([UserRoleEnum.ADMIN, UserRoleEnum.INSTRUCTOR]),
            validationMiddleware(SearchWithPaginationDto),
            this.roleController.getItems,
        );

        // GET domain:/api/roles/:id -> Get item by id
        this.router.get(`${this.path}/:id`, this.roleController.getItem);

        // PUT domain:/api/roles/:id -> Update item
        this.router.put(`${this.path}/:id`, validationMiddleware(UpdateRoleDto), this.roleController.updateItem);

        // POST domain:/api/roles/:id -> Delete item logic
        this.router.delete(`${this.path}/:id`, this.roleController.deleteItem);
    }
}
