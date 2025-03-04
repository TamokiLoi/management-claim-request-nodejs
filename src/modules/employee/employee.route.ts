import { Router } from 'express';
import { API_PATH } from '../../core/constants';
import { BaseRoleCode } from '../../core/enums';
import { IRoute } from '../../core/interfaces';
import { authMiddleWare, validationMiddleware } from '../../core/middleware';
import UpdateEmployeeDto from './dtos/update.dto';
import EmployeeController from './employee.controller';

export default class EmployeeRoute implements IRoute {
    public path = API_PATH.EMPLOYEES;
    public router = Router();
    public employeeController = new EmployeeController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /**
         * @swagger
         * tags:
         *   - name: Employee
         *     description: Employee related endpoints
         */

        /**
         * @swagger
         * /api/employees/{id}:
         *   get:
         *     summary: Get employee by UserID
         *     tags: [Employee]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: string
         *         required: true
         *         description: The user ID
         *     responses:
         *       200:
         *         description: Employee data
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
         *                       example: "67a5ba7a15aae59b3b726443"
         *                     user_id:
         *                       type: string
         *                       example: "67a5ba7a15aae59b3b726441"
         *                     job_rank:
         *                       type: string
         *                       example: ""
         *                     contract_type:
         *                       type: string
         *                       example: ""
         *                     address:
         *                       type: string
         *                       example: ""
         *                     phone:
         *                       type: string
         *                       example: ""
         *                     full_name:
         *                       type: string
         *                       example: ""
         *                     avatar_url:
         *                       type: string
         *                       example: ""
         *                     department_name:
         *                       type: string
         *                       example: ""
         *                     salary:
         *                       type: number
         *                       example: 0
         *                     start_date:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-07T07:47:06.175Z"
         *                     end_date:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-07T07:47:06.175Z"
         *                     updated_by:
         *                       type: string
         *                       example: "678e17134e6e72ce391d0946"
         *                     created_at:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-07T07:47:06.175Z"
         *                     updated_at:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-07T07:47:06.175Z"
         *                     is_deleted:
         *                       type: boolean
         *                       example: false
         *                     __v:
         *                       type: number
         *                       example: 0
         */
        // GET domain:/api/employees/:id -> Get employee by id
        this.router.get(`${this.path}/:id`, authMiddleWare(), this.employeeController.getDetail);

        /**
         * @swagger
         * /api/employees/{id}:
         *   put:
         *     summary: Update employee
         *     tags: [Employee]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: string
         *         required: true
         *         description: The employee ID
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - user_id
         *               - job_rank
         *               - contract_type
         *               - account
         *               - address
         *               - phone
         *               - full_name
         *               - avatar_url
         *               - department_name
         *               - salary
         *               - start_date
         *               - end_date
         *               - updated_by
         *             properties:
         *               user_id:
         *                 type: string
         *                 example: "67a5ba7a15aae59b3b726441"
         *               job_rank:
         *                 type: string
         *                 example: "DEV1"
         *               contract_type:
         *                 type: string
         *                 example: "THREE YEAR"
         *               account:
         *                 type: string
         *                 example: "tamoki1110"
         *               address:
         *                 type: string
         *                 example: "123"
         *               phone:
         *                 type: string
         *                 example: "0938947221"
         *               full_name:
         *                 type: string
         *                 example: "Tamoki Loi"
         *               avatar_url:
         *                 type: string
         *                 format: uri
         *                 example: "https://picsum.photos/200/300"
         *               department_name:
         *                 type: string
         *                 example: "CMS"
         *               salary:
         *                 type: number
         *                 example: 5000000
         *               start_date:
         *                 type: string
         *                 format: date-time
         *                 example: "2025-01-20T09:25:48.020Z"
         *               end_date:
         *                 type: string
         *                 format: date-time
         *                 example: "2025-01-20T09:25:48.020Z"
         *               updated_by:
         *                 type: string
         *                 example: "678e17134e6e72ce391d0946"
         *     responses:
         *       200:
         *         description: Employee updated successfully
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
         *                       example: "67a5ba7a15aae59b3b726443"
         *                     user_id:
         *                       type: string
         *                       example: "67a5ba7a15aae59b3b726441"
         *                     job_rank:
         *                       type: string
         *                       example: "DEV1"
         *                     contract_type:
         *                       type: string
         *                       example: "THREE YEAR"
         *                     account:
         *                       type: string
         *                       example: "tamoki1110"
         *                     address:
         *                       type: string
         *                       example: "123"
         *                     phone:
         *                       type: string
         *                       example: "0938947221"
         *                     full_name:
         *                       type: string
         *                       example: "Tamoki Loi"
         *                     avatar_url:
         *                       type: string
         *                       format: uri
         *                       example: "https://picsum.photos/200/300"
         *                     department_name:
         *                       type: string
         *                       example: "CMS"
         *                     salary:
         *                       type: number
         *                       example: 5000000
         *                     start_date:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-01-20T09:25:48.020Z"
         *                     end_date:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-01-20T09:25:48.020Z"
         *                     updated_by:
         *                       type: string
         *                       example: "678e17134e6e72ce391d0946"
         *                     created_at:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-07T07:47:06.175Z"
         *                     updated_at:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-07T08:10:36.844Z"
         *                     is_deleted:
         *                       type: boolean
         *                       example: false
         *                     __v:
         *                       type: number
         *                       example: 0
         */
        // PUT domain:/api/employees/:id -> Update employee
        this.router.put(
            `${this.path}/:id`,
            authMiddleWare([BaseRoleCode.A001, BaseRoleCode.A003, BaseRoleCode.A004]),
            validationMiddleware(UpdateEmployeeDto),
            this.employeeController.update,
        );
    }
}
