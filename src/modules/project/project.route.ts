import { Router } from 'express';
import { API_PATH } from '../../core/constants';
import { BaseRoleCode } from '../../core/enums';
import { IRoute } from '../../core/interfaces';
import { authMiddleWare, validationMiddleware } from '../../core/middleware';
import CreateProjectDto from './dtos/create.dto';
import SearchPaginationProjectDto from './dtos/searchPagination.dto';
import UpdateProjectStatusDto from './dtos/updateStatus.dto';
import ProjectController from './project.controller';

export default class ProjectRoute implements IRoute {
    public path = API_PATH.PROJECTS;
    public router = Router();
    public projectController = new ProjectController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /**
         * @swagger
         * tags:
         *   - name: Project
         *     description: Project related endpoints
         */

        /**
         * @swagger
         * /api/projects/roles:
         *   get:
         *     summary: Get all roles in project
         *     tags: [Project]
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
         *                         example: "678e035aa76e35135ab726ab"
         *                       job_rank:
         *                         type: string
         *                         example: "TC3"
         *                       job_title:
         *                         type: string
         *                         example: "Technical Consultant"
         *                       is_deleted:
         *                         type: boolean
         *                         example: false
         *                       created_at:
         *                         type: string
         *                         format: date-time
         *                         example: "2025-01-20T08:03:38.677Z"
         *                       updated_at:
         *                         type: string
         *                         format: date-time
         *                         example: "2025-01-20T08:03:38.677Z"
         *                       __v:
         *                         type: integer
         *                         example: 0
         */
        // GET domain:/api/projects/roles -> Get all items roles in project
        this.router.get(API_PATH.PROJECTS_ROLES, authMiddleWare(), this.projectController.getRolesInProject);

        /**
         * @swagger
         * /api/projects:
         *   post:
         *     summary: Create a new project
         *     tags: [Project]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               project_name:
         *                 type: string
         *                 example: "FMJFA Family Mart"
         *               project_code:
         *                 type: string
         *                 example: "FMJFA"
         *               project_department:
         *                 type: string
         *                 example: "CMS"
         *               project_description:
         *                 type: string
         *                 example: "13123123123"
         *               project_start_date:
         *                 type: string
         *                 format: date-time
         *                 example: "2025-02-07T07:47:06.175Z"
         *               project_end_date:
         *                 type: string
         *                 format: date-time
         *                 example: "2025-02-07T07:47:06.175Z"
         *               project_members:
         *                 type: array
         *                 items:
         *                   type: object
         *                   properties:
         *                     user_id:
         *                       type: string
         *                       example: "67b2fd17f6afc068678f14b5"
         *                     project_role:
         *                       type: string
         *                       example: "Project Manager"
         *     responses:
         *       200:
         *         description: Project created successfully
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
         *                       example: "67b2fd31f6afc068678f14bc"
         *                     project_code:
         *                       type: string
         *                       example: "FMJFA"
         *                     project_name:
         *                       type: string
         *                       example: "FMJFA Family Mart"
         *                     project_department:
         *                       type: string
         *                       example: "CMS"
         *                     project_description:
         *                       type: string
         *                       example: "123123123"
         *                     project_start_date:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-07T07:47:06.175Z"
         *                     project_end_date:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-07T07:47:06.175Z"
         *                     project_members:
         *                       type: array
         *                       items:
         *                         type: object
         *                         properties:
         *                           user_id:
         *                             type: string
         *                             example: "67b2fd17f6afc068678f14b5"
         *                           project_role:
         *                             type: string
         *                             example: "67b2fd31f6afc068678f14bd"
         *                     updated_by:
         *                       type: string
         *                       example: "678e17134e6e72ce391d0946"
         *                     is_deleted:
         *                       type: boolean
         *                       example: false
         *                     created_at:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-17T09:11:13.478Z"
         *                     updated_at:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-17T09:11:13.478Z"
         *                     __v:
         *                       type: number
         *                       example: 0
         */
        // POST domain:/api/projects -> Create project
        this.router.post(
            this.path,
            authMiddleWare([BaseRoleCode.A001]),
            validationMiddleware(CreateProjectDto),
            this.projectController.create,
        );

        /**
         * @swagger
         * /api/projects/search:
         *   post:
         *     summary: Search projects with pagination
         *     tags: [Project]
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
         *                   project_start_date:
         *                     type: string
         *                     format: date
         *                     example: ""
         *                   project_end_date:
         *                     type: string
         *                     format: date
         *                     example: ""
         *                   is_delete:
         *                     type: boolean
         *                     example: false
         *                   user_id:
         *                     type: string
         *                     example: ""
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
         *         description: List of projects with pagination
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
         *                             example: "67b54907fc4bb8b2318e7bd8"
         *                           project_name:
         *                             type: string
         *                             example: "FMJFA Family Mart2"
         *                           project_code:
         *                             type: string
         *                             example: "FMJFA2"
         *                           project_department:
         *                             type: string
         *                             example: "CMS"
         *                           project_description:
         *                             type: string
         *                             example: "13123123123"
         *                           project_status:
         *                             type: string
         *                             example: "New"
         *                           project_start_date:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-07T07:47:06.175Z"
         *                           project_end_date:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-07T07:47:06.175Z"
         *                           updated_by:
         *                             type: string
         *                             example: "678e17134e6e72ce391d0946"
         *                           is_deleted:
         *                             type: boolean
         *                             example: false
         *                           created_at:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-19T02:59:19.930Z"
         *                           updated_at:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-19T02:59:19.930Z"
         *                           project_comment:
         *                             type: string
         *                             nullable: true
         *                             example: null
         *                           project_members:
         *                             type: array
         *                             items:
         *                               type: object
         *                               properties:
         *                                 project_role:
         *                                   type: string
         *                                   example: "Project Manager"
         *                                 user_id:
         *                                   type: string
         *                                   example: "67b2fd17f6afc068678f14b5"
         *                                 employee_id:
         *                                   type: string
         *                                   example: "67b2fd17f6afc068678f14b7"
         *                                 user_name:
         *                                   type: string
         *                                   example: "tamoki1111"
         *                                 full_name:
         *                                   type: string
         *                                   example: ""
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
         *                           example: 1
         *                         totalPages:
         *                           type: number
         *                           example: 1
         */
        // POST domain:/api/projects/search -> Get items by conditions
        this.router.post(
            API_PATH.PROJECTS_SEARCH,
            authMiddleWare([BaseRoleCode.A001]),
            validationMiddleware(SearchPaginationProjectDto),
            this.projectController.getItems,
        );

        /**
         * @swagger
         * /api/projects/{id}:
         *   get:
         *     summary: Get project by ID
         *     tags: [Project]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: string
         *         required: true
         *         description: The Project ID
         *     responses:
         *       200:
         *         description: Project data
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
         *                       example: "67b43d15f4d1e49e5326bb8e"
         *                     project_name:
         *                       type: string
         *                       example: "FMJFA Family Mart"
         *                     project_code:
         *                       type: string
         *                       example: "FMJFA"
         *                     project_department:
         *                       type: string
         *                       example: "CMS"
         *                     project_description:
         *                       type: string
         *                       example: "13123123123"
         *                     project_status:
         *                       type: string
         *                       example: "Pending"
         *                     project_start_date:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-07T07:47:06.175Z"
         *                     project_end_date:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-07T07:47:06.175Z"
         *                     updated_by:
         *                       type: string
         *                       example: "678e17134e6e72ce391d0946"
         *                     is_deleted:
         *                       type: boolean
         *                       example: false
         *                     created_at:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-18T07:56:05.162Z"
         *                     updated_at:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-18T08:05:03.421Z"
         *                     project_comment:
         *                       type: string
         *                       example: "123"
         *                     project_members:
         *                       type: array
         *                       items:
         *                         type: object
         *                         properties:
         *                           project_role:
         *                             type: string
         *                             example: "Project Manager"
         *                           user_id:
         *                             type: string
         *                             example: "67b2fd17f6afc068678f14b5"
         *                           employee_id:
         *                             type: string
         *                             example: "67b2fd17f6afc068678f14b7"
         *                           user_name:
         *                             type: string
         *                             example: "tamoki1111"
         *                           full_name:
         *                             type: string
         *                             example: "Tamoki Loi"
         */
        // GET domain:/api/projects/:id -> Get project by id
        this.router.get(`${this.path}/:id`, authMiddleWare(), this.projectController.getItem);

        /**
         * @swagger
         * /api/projects/change-status:
         *   put:
         *     summary: Change project status
         *     tags: [Project]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - project_id
         *               - project_status
         *               - project_comment
         *             properties:
         *               project_id:
         *                 type: string
         *                 example: "67b43d15f4d1e49e5326bb8e"
         *               project_status:
         *                 type: string
         *                 example: "Pending"
         *               project_comment:
         *                 type: string
         *                 example: "123"
         *     responses:
         *       200:
         *         description: Project status updated successfully
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
         *                   nullable: true
         */
        // PUT domain:/api/projects/change-status -> Change project status
        this.router.put(
            API_PATH.PROJECTS_CHANGE_STATUS,
            authMiddleWare([BaseRoleCode.A001]),
            validationMiddleware(UpdateProjectStatusDto),
            this.projectController.updateStatus,
        );

        /**
         * @swagger
         * /api/projects/{id}:
         *   put:
         *     summary: Update project
         *     tags: [Project]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: string
         *         required: true
         *         description: The project ID
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - project_name
         *               - project_code
         *               - project_department
         *               - project_description
         *               - project_start_date
         *               - project_end_date
         *               - project_members
         *             properties:
         *               project_name:
         *                 type: string
         *                 example: "FMJFA Family Mart 1"
         *               project_code:
         *                 type: string
         *                 example: "FMJFA"
         *               project_department:
         *                 type: string
         *                 example: "CMS"
         *               project_description:
         *                 type: string
         *                 example: "13123123123"
         *               project_start_date:
         *                 type: string
         *                 format: date-time
         *                 example: "2025-02-07T07:47:06.175Z"
         *               project_end_date:
         *                 type: string
         *                 format: date-time
         *                 example: "2025-02-07T07:47:06.175Z"
         *               project_members:
         *                 type: array
         *                 items:
         *                   type: object
         *                   required:
         *                     - user_id
         *                     - project_role
         *                   properties:
         *                     user_id:
         *                       type: string
         *                       example: "67b2fd17f6afc068678f14b5"
         *                     project_role:
         *                       type: string
         *                       example: "Project Manager"
         *     responses:
         *       200:
         *         description: Project updated successfully
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
         *                       example: "67b3007bd00f73f03c3541fd"
         *                     project_code:
         *                       type: string
         *                       example: "FMJFA"
         *                     project_name:
         *                       type: string
         *                       example: "FMJFA Family Mart 1"
         *                     project_department:
         *                       type: string
         *                       example: "CMS"
         *                     project_description:
         *                       type: string
         *                       example: "13123123123"
         *                     project_members:
         *                       type: array
         *                       items:
         *                         type: object
         *                         properties:
         *                           user_id:
         *                             type: string
         *                             example: "67b2fd17f6afc068678f14b5"
         *                           project_role:
         *                             type: string
         *                             example: "Project Manager"
         *                           _id:
         *                             type: string
         *                             example: "67b305cd374bba420c7063c2"
         *                     project_start_date:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-07T07:47:06.175Z"
         *                     project_end_date:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-07T07:47:06.175Z"
         *                     updated_by:
         *                       type: string
         *                       example: "678e17134e6e72ce391d0946"
         *                     is_deleted:
         *                       type: boolean
         *                       example: false
         *                     created_at:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-17T09:25:15.577Z"
         *                     updated_at:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-17T09:47:57.935Z"
         *                     __v:
         *                       type: number
         *                       example: 0
         */
        // PUT domain:/api/projects/:id -> Update project
        this.router.put(
            `${this.path}/:id`,
            authMiddleWare([BaseRoleCode.A001]),
            validationMiddleware(CreateProjectDto),
            this.projectController.update,
        );

        /**
         * @swagger
         * /api/projects/{id}:
         *   delete:
         *     summary: Delete project
         *     tags: [Project]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: string
         *         required: true
         *         description: The Project ID
         *     responses:
         *       200:
         *         description: Project deleted successfully
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
        // DELETE domain:/api/projects/:id -> Delete project logic
        this.router.delete(`${this.path}/:id`, authMiddleWare([BaseRoleCode.A001]), this.projectController.delete);
    }
}
