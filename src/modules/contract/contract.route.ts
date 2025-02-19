import { Router } from 'express';
import { API_PATH } from '../../core/constants';
import { IRoute } from '../../core/interfaces';
import { authMiddleWare } from '../../core/middleware';
import ContractController from './contract.controller';

export default class ContractRoute implements IRoute {
    public path = API_PATH.CONTRACTS;
    public router = Router();
    public contractController = new ContractController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /**
         * @swagger
         * tags:
         *   - name: Contract
         *     description: Contract related endpoints
         */

        /**
         * @swagger
         * /api/contracts/get-all:
         *   get:
         *     summary: Get all contracts or by keyword
         *     tags: [Contract]
         *     parameters:
         *       - in: query
         *         name: keyword
         *         schema:
         *           type: string
         *         description: The keyword related with contract_type and description
         *     responses:
         *       200:
         *         description: List of contract
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
        // GET domain:/api/contracts/get-all?keyword='' -> Get all items or by keyword
        this.router.get(API_PATH.GET_ALL_CONTRACTS, authMiddleWare(), this.contractController.getAllItems);
    }
}
