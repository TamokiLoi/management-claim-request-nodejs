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
         *     summary: Get all contracts or filter by keyword
         *     tags: [Contract]
         *     parameters:
         *       - in: query
         *         name: keyword
         *         schema:
         *           type: string
         *         description: The keyword related to contract_type and description
         *     responses:
         *       200:
         *         description: List of contracts
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
         *                         example: "678f692a144cbc1e94917e72"
         *                       contract_type:
         *                         type: string
         *                         example: "INDEFINITE"
         *                       description:
         *                         type: string
         *                         example: "Contract no limit time."
         *                       is_deleted:
         *                         type: boolean
         *                         example: false
         *                       created_at:
         *                         type: string
         *                         format: date-time
         *                         example: "2025-01-21T09:30:18.566Z"
         *                       updated_at:
         *                         type: string
         *                         format: date-time
         *                         example: "2025-01-21T09:30:18.566Z"
         *                       __v:
         *                         type: integer
         *                         example: 0
         */
        // GET domain:/api/contracts/get-all?keyword='' -> Get all items or by keyword
        this.router.get(API_PATH.GET_ALL_CONTRACTS, authMiddleWare(), this.contractController.getAllItems);
    }
}
