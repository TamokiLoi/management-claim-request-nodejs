import { Router } from 'express';
import { API_PATH } from '../../core/constants';
import { IRoute } from '../../core/interfaces';
import { authMiddleWare } from '../../core/middleware';
import DepartmentController from './department.controller';

export default class DepartmentRoute implements IRoute {
    public path = API_PATH.DEPARTMENT;
    public router = Router();
    public departmentController = new DepartmentController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /**
         * @swagger
         * tags:
         *   - name: Department
         *     description: Department related endpoints
         */

        /**
         * @swagger
         * /api/departments/get-all:
         *   get:
         *     summary: Get all departments or filter by keyword
         *     tags: [Department]
         *     parameters:
         *       - in: query
         *         name: keyword
         *         schema:
         *           type: string
         *         description: The keyword related to department_code and department_name
         *     responses:
         *       200:
         *         description: List of departments
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
         *                         example: "67b6e14211fa7aaa835430a7"
         *                       department_code:
         *                         type: string
         *                         example: "DE04"
         *                       department_name:
         *                         type: string
         *                         example: "Department 04"
         *                       description:
         *                         type: string
         *                         example: "Department 04"
         *                       is_deleted:
         *                         type: boolean
         *                         example: false
         *                       created_at:
         *                         type: string
         *                         format: date-time
         *                         example: "2025-02-20T08:01:06.177Z"
         *                       updated_at:
         *                         type: string
         *                         format: date-time
         *                         example: "2025-02-20T08:01:06.177Z"
         *                       __v:
         *                         type: integer
         *                         example: 0
         */
        // GET domain:/api/departments/get-all?keyword='' -> Get all items or by keyword
        this.router.get(API_PATH.GET_ALL_DEPARTMENT, authMiddleWare(), this.departmentController.findItemsWithKeyword);
    }
}
