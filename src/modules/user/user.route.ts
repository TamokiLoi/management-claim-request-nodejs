import { Router } from 'express';
import { API_PATH } from '../../core/constants';
import { BaseRoleCode } from '../../core/enums';
import { IRoute } from '../../core/interfaces';
import { authMiddleWare, validationMiddleware } from '../../core/middleware';
import ChangePasswordDto from './dtos/changePassword.dto';
import ChangeRoleDto from './dtos/changeRole.dto';
import ChangeStatusDto from './dtos/changeStatus.dto';
import CreateUserDto from './dtos/createUser.dto';
import SearchPaginationUserDto from './dtos/searchPaginationUser.dto';
import UpdateUserDto from './dtos/updateUser.dto';
import UserController from './user.controller';

export default class UserRoute implements IRoute {
    public path = API_PATH.USERS;
    public router = Router();
    public userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /**
         * @swagger
         * tags:
         *   - name: User
         *     description: User related endpoints
         */

        /**
         * @swagger
         * /api/users:
         *   post:
         *     summary: Create user
         *     tags: [User]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *                 example: ''
         *               password:
         *                 type: string
         *                 example: ''
         *               user_name:
         *                 type: string
         *                 example: ''
         *               role_code:
         *                 type: string
         *                 example: ''
         *     responses:
         *       200:
         *         description: User data
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   example: true
         *                 data:
         *                   type: object
         *                   properties:
         *                     _id:
         *                       type: string
         *                       example: 6786117ca2e8a8cfbf2032bf
         *                     email:
         *                       type: string
         *                       example: admin@gmail.com
         *                     user_name:
         *                       type: string
         *                       example: admin
         *                     role_code:
         *                       type: string
         *                       example: A001
         *                     is_verified:
         *                       type: boolean
         *                       example: true
         *                     verification_token:
         *                       type: string
         *                       example: ""
         *                     verification_token_expires:
         *                       type: string
         *                       format: date-time
         *                       example: 2025-01-14T07:25:48.526Z
         *                     token_version:
         *                       type: number
         *                       example: 1
         *                     is_blocked:
         *                       type: boolean
         *                       example: false
         *                     created_at:
         *                       type: string
         *                       format: date-time
         *                       example: 2025-01-14T07:25:48.526Z
         *                     updated_at:
         *                       type: string
         *                       format: date-time
         *                       example: 2025-01-14T07:25:48.526Z
         *                     is_deleted:
         *                       type: boolean
         *                       example: false
         *                     __v:
         *                       type: number
         *                       example: 0
         */
        // POST domain:/api/users -> Create user
        this.router.post(
            this.path,
            authMiddleWare(),
            validationMiddleware(CreateUserDto),
            this.userController.create,
        );

        /**
         * @swagger
         * /api/users/search:
         *   post:
         *     summary: Get all users with search condition and pagination
         *     tags: [User]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               searchCondition:
         *                 type: object
         *                 properties:
         *                   keyword:
         *                     type: string
         *                     example: ''
         *                   role_code:
         *                     type: string
         *                     example: ''
         *                   is_blocked:
         *                     type: boolean
         *                     example: false
         *                   is_delete:
         *                     type: boolean
         *                     example: false
         *                   is_verified:
         *                     oneOf:
         *                       - type: string
         *                         example: ''
         *                       - type: boolean
         *                         example: true
         *               pageInfo:
         *                 type: object
         *                 properties:
         *                   pageNum:
         *                     type: number
         *                     example: 1
         *                   pageSize:
         *                     type: number
         *                     example: 10
         *     responses:
         *       200:
         *         description: List of users
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   example: true
         *                 data:
         *                   type: object
         *                   properties:
         *                     pageData:
         *                       type: array
         *                       items:
         *                         type: object
         *                         properties:
         *                           _id:
         *                             type: string
         *                             example: "67876c01704869dc70dd01d0"
         *                           email:
         *                             type: string
         *                             example: "123@gmail.com"
         *                           user_name:
         *                             type: string
         *                             example: "name"
         *                           role_code:
         *                             type: string
         *                             example: "A001"
         *                           is_verified:
         *                             type: boolean
         *                             example: true
         *                           is_blocked:
         *                             type: boolean
         *                             example: false
         *                           is_deleted:
         *                             type: boolean
         *                             example: false
         *                           created_at:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-01-15T08:04:17.630Z"
         *                           updated_at:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-01-15T08:33:02.446Z"
         *                           __v:
         *                             type: number
         *                             example: 0
         *                           token_version:
         *                             type: number
         *                             example: 1
         *                     pageInfo:
         *                       type: object
         *                       properties:
         *                         pageNum:
         *                           type: number
         *                           example: 1
         *                         pageSize:
         *                           type: number
         *                           example: 10
         *                         totalItems:
         *                           type: number
         *                           example: 2
         *                         totalPages:
         *                           type: number
         *                           example: 1
         */
        // POST domain:/api/users/search -> Get items by conditions
        this.router.post(
            API_PATH.SEARCH_USERS,
            authMiddleWare(),
            validationMiddleware(SearchPaginationUserDto),
            this.userController.getItems,
        );

        /**
         * @swagger
         * /api/users/{id}:
         *   get:
         *     summary: Get user by ID
         *     tags: [User]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: string
         *         required: true
         *         description: The user ID
         *     responses:
         *       200:
         *         description: User data
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   example: true
         *                 data:
         *                   type: object
         *                   properties:
         *                     _id:
         *                       type: string
         *                       example: 6786117ca2e8a8cfbf2032bf
         *                     email:
         *                       type: string
         *                       example: admin@gmail.com
         *                     user_name:
         *                       type: string
         *                       example: admin
         *                     role_code:
         *                       type: string
         *                       example: A001
         *                     is_verified:
         *                       type: boolean
         *                       example: true
         *                     verification_token:
         *                       type: string
         *                       example: ""
         *                     verification_token_expires:
         *                       type: string
         *                       format: date-time
         *                       example: 2025-01-14T07:25:48.526Z
         *                     token_version:
         *                       type: number
         *                       example: 1
         *                     is_blocked:
         *                       type: boolean
         *                       example: false
         *                     created_at:
         *                       type: string
         *                       format: date-time
         *                       example: 2025-01-14T07:25:48.526Z
         *                     updated_at:
         *                       type: string
         *                       format: date-time
         *                       example: 2025-01-14T07:25:48.526Z
         *                     is_deleted:
         *                       type: boolean
         *                       example: false
         *                     __v:
         *                       type: number
         *                       example: 0
         */
        // GET domain:/api/users/:id -> Get user by id
        this.router.get(`${this.path}/:id`, authMiddleWare(), this.userController.getItem);

        /**
         * @swagger
         * /api/users/change-password:
         *   put:
         *     summary: Change user password
         *     tags: [User]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               old_password:
         *                 type: string
         *                 example: ''
         *               new_password:
         *                 type: string
         *                 example: ''
         *     responses:
         *       200:
         *         description: Password changed successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                 data:
         *                   type: object
         *                   nullable: true
         *       400:
         *         description: Bad request
         *       500:
         *         description: Internal server error
         */
        // PUT domain:/api/users/change-password -> Change password of user
        this.router.put(
            API_PATH.CHANGE_PASSWORD,
            authMiddleWare(),
            validationMiddleware(ChangePasswordDto),
            this.userController.changePassword,
        );

        /**
         * @swagger
         * /api/users/change-status:
         *   put:
         *     summary: Change user status
         *     tags: [User]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               user_id:
         *                 type: string
         *                 example: ''
         *               is_blocked:
         *                 type: boolean
         *                 example: true
         *     responses:
         *       200:
         *         description: User status changed successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                 data:
         *                   type: object
         *                   nullable: true
         */
        // PUT domain:/api/users/change-status -> Change status of user
        this.router.put(
            API_PATH.CHANGE_STATUS_USERS,
            authMiddleWare([BaseRoleCode.A001]),
            validationMiddleware(ChangeStatusDto),
            this.userController.changeStatus,
        );

        /**
         * @swagger
         * /api/users/change-role:
         *   put:
         *     summary: Change user role
         *     tags: [User]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               user_id:
         *                 type: string
         *                 example: ''
         *               role_code:
         *                 type: string
         *                 example: 'A001'
         *     responses:
         *       200:
         *         description: User role changed successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                 data:
         *                   type: object
         *                   nullable: true
         */
        // PUT domain:/api/users/change-role -> Change role of user
        this.router.put(
            API_PATH.CHANGE_ROLE_USER,
            authMiddleWare([BaseRoleCode.A001]),
            validationMiddleware(ChangeRoleDto),
            this.userController.changeRole,
        );

        /**
         * @swagger
         * /api/users/{id}:
         *   put:
         *     summary: Update user
         *     tags: [User]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: string
         *         required: true
         *         description: The user ID
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *                 example: ''
         *               user_name:
         *                 type: string
         *                 example: ''
         *     responses:
         *       200:
         *         description: User updated successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   example: true
         *                 data:
         *                   type: object
         *                   properties:
         *                     _id:
         *                       type: string
         *                       example: 6786117ca2e8a8cfbf2032bf
         *                     email:
         *                       type: string
         *                       example: admin@gmail.com
         *                     user_name:
         *                       type: string
         *                       example: admin
         *                     role_code:
         *                       type: string
         *                       example: A001
         *                     is_verified:
         *                       type: boolean
         *                       example: true
         *                     verification_token:
         *                       type: string
         *                       example: ""
         *                     verification_token_expires:
         *                       type: string
         *                       format: date-time
         *                       example: 2025-01-14T07:25:48.526Z
         *                     token_version:
         *                       type: number
         *                       example: 1
         *                     is_blocked:
         *                       type: boolean
         *                       example: false
         *                     created_at:
         *                       type: string
         *                       format: date-time
         *                       example: 2025-01-14T07:25:48.526Z
         *                     updated_at:
         *                       type: string
         *                       format: date-time
         *                       example: 2025-01-14T07:25:48.526Z
         *                     is_deleted:
         *                       type: boolean
         *                       example: false
         *                     __v:
         *                       type: number
         *                       example: 0
         */
        // PUT domain:/api/users/:id -> Update user
        this.router.put(
            `${this.path}/:id`,
            authMiddleWare(),
            validationMiddleware(UpdateUserDto),
            this.userController.update,
        );

        /**
         * @swagger
         * /api/users/{id}:
         *   delete:
         *     summary: Delete user
         *     tags: [User]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: string
         *         required: true
         *         description: The user ID
         *     responses:
         *       200:
         *         description: User deleted successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                 data:
         *                   type: object
         *                   nullable: true
         */
        // DELETE domain:/api/users/:id -> Delete user logic
        this.router.delete(`${this.path}/:id`, authMiddleWare([BaseRoleCode.A001]), this.userController.delete);
    }
}
