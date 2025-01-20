import { Router } from 'express';
import { API_PATH } from '../../core/constants';
import { BaseRoleCode } from '../../core/enums';
import { IRoute } from '../../core/interfaces';
import { authMiddleWare, validationMiddleware } from '../../core/middleware';
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
        /**
         * @swagger
         * tags:
         *   - name: Role
         *     description: Role related endpoints
         */

        // POST domain:/api/roles -> create new item
        this.router.post(
            this.path,
            authMiddleWare([BaseRoleCode.A001]),
            validationMiddleware(CreateRoleDto),
            this.roleController.create,
        );

                /**
         * @swagger
         * /api/roles/get-all:
         *   get:
         *     summary: Get all roles or by keyword
         *     tags: [Role]
         *     parameters:
         *       - in: query
         *         name: keyword
         *         schema:
         *           type: string
         *         description: The keyword related with role_code and role_name
         *     responses:
         *       200:
         *         description: List of roles
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   example: true
         *                 data:
         *                   type: array
         *                   items:
         *                     type: object
         *                     properties:
         *                       _id:
         *                         type: string
         *                         example: "678e16f34e6e72ce391d08ec"
         *                       role_code:
         *                         type: string
         *                         example: "A001"
         *                       role_name:
         *                         type: string
         *                         example: "Administrator"
         *                       description:
         *                         type: string
         *                         example: "System administrator"
         *                       is_deleted:
         *                         type: boolean
         *                         example: false
         *                       created_at:
         *                         type: string
         *                         format: date-time
         *                         example: "2025-01-20T09:27:15.917Z"
         *                       updated_at:
         *                         type: string
         *                         format: date-time
         *                         example: "2025-01-20T09:27:15.917Z"
         *                       __v:
         *                         type: number
         *                         example: 0
         */
        // GET domain:/api/role/get-all?keyword='' -> Get all items or by keyword
        this.router.get(
            API_PATH.GET_ALL_ROLES,
            authMiddleWare([BaseRoleCode.A001, BaseRoleCode.A002]),
            this.roleController.getAllItems,
        );

        // POST domain:/api/roles/search -> Get items by conditions
        this.router.post(
            API_PATH.SEARCH_ROLES,
            authMiddleWare([BaseRoleCode.A001, BaseRoleCode.A002]),
            validationMiddleware(SearchWithPaginationDto),
            this.roleController.getItems,
        );

        // GET domain:/api/roles/:id -> Get item by id
        this.router.get(`${this.path}/:id`, authMiddleWare([BaseRoleCode.A001]), this.roleController.getItem);

        // PUT domain:/api/roles/:id -> Update item
        this.router.put(
            `${this.path}/:id`,
            authMiddleWare([BaseRoleCode.A001]),
            validationMiddleware(UpdateRoleDto),
            this.roleController.updateItem,
        );

        // POST domain:/api/roles/:id -> Delete item logic
        this.router.delete(`${this.path}/:id`, authMiddleWare([BaseRoleCode.A001]), this.roleController.deleteItem);
    }
}
