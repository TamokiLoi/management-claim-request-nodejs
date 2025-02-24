import { Router } from 'express';
import { API_PATH } from '../../../core/constants';
import { IRoute } from '../../../core/interfaces';
import { authMiddleWare, validationMiddleware } from '../../../core/middleware';
import ClaimLogController from './claimLog.controller';
import SearchPaginationClaimLogDto from './dto/searchPagination.dto';

export default class ClaimLogRoute implements IRoute {
    public path = API_PATH.CLAIM_LOGS;
    public router = Router();
    public claimLogController = new ClaimLogController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /**
         * @swagger
         * tags:
         *   - name: Claim Logs
         *     description: Claim logs related endpoints
         */

        /**
         * @swagger
         * /api/claim-logs/search:
         *   post:
         *     summary: Search claim logs with pagination
         *     tags: [Claim Logs]
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
         *                   claim_id:
         *                     type: string
         *                     example: "67b93c4db74349d8a681d145"
         *                   is_deleted:
         *                     type: boolean
         *                     example: false
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
         *         description: List of claim logs with pagination
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
         *                             example: "67ba9c361fd41c4532c80660"
         *                           claim_name:
         *                             type: string
         *                             example: "Request OT"
         *                           updated_by:
         *                             type: string
         *                             example: "tamoki1113"
         *                           old_status:
         *                             type: string
         *                             example: "Draft"
         *                           new_status:
         *                             type: string
         *                             example: "Canceled"
         *                           is_deleted:
         *                             type: boolean
         *                             example: false
         *                           created_at:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-23T03:55:34.493Z"
         *                           updated_at:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-23T03:55:34.493Z"
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
        // POST domain:/api/claim-logs/search -> Get items by conditions
        this.router.post(
            API_PATH.CLAIM_LOGS_SEARCH,
            authMiddleWare(),
            validationMiddleware(SearchPaginationClaimLogDto),
            this.claimLogController.getItems,
        );
    }
}
