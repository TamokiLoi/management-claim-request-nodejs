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
         *     summary: Get all department or by keyword
         *     tags: [Department]
         *     parameters:
         *       - in: query
         *         name: keyword
         *         schema:
         *           type: string
         *         description: The keyword related with department_code and department_name
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
        // GET domain:/api/departments/get-all?keyword='' -> Get all items or by keyword
        this.router.get(API_PATH.GET_ALL_DEPARTMENT, authMiddleWare(), this.departmentController.findItemsWithKeyword);
    }
}
