import { Router } from 'express';
import { API_PATH } from '../../core/constants';
import { IRoute } from '../../core/interfaces';
import { authMiddleWare, validationMiddleware } from '../../core/middleware';
import ClaimController from './claim.controller';
import CreateClaimDto from './dto/create.dto';
import SearchPaginationClaimDto from './dto/searchPagination.dto';
import UpdateClaimDto from './dto/update.dto';
import UpdateClaimStatusDto from './dto/updateStatus.dto';
import { BaseRoleCode } from '../../core/enums';

export default class ClaimRoute implements IRoute {
    public path = API_PATH.CLAIMS;
    public router = Router();
    public claimController = new ClaimController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /**
         * @swagger
         * tags:
         *   - name: Claim
         *     description: Claim related endpoints
         */

        /**
         * @swagger
         * /api/claims:
         *   post:
         *     summary: Create a new claim
         *     tags: [Claim]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               project_id:
         *                 type: string
         *                 example: "67b43d15f4d1e49e5326bb8e"
         *               approval_id:
         *                 type: string
         *                 example: "67b2fd17f6afc068678f14b5"
         *               claim_name:
         *                 type: string
         *                 example: "Request OT"
         *               claim_start_date:
         *                 type: string
         *                 format: date-time
         *                 example: "2025-02-11T08:48:36.083Z"
         *               claim_end_date:
         *                 type: string
         *                 format: date-time
         *                 example: "2025-02-13T08:48:36.083Z"
         *               total_work_time:
         *                 type: number
         *                 example: 8
         *               remark:
         *                 type: string
         *                 example: ""
         *     responses:
         *       200:
         *         description: Claim created successfully
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
         *                     user_id:
         *                       type: string
         *                       example: "678e17134e6e72ce391d0946"
         *                     project_id:
         *                       type: string
         *                       example: "67b43d15f4d1e49e5326bb8e"
         *                     approval_id:
         *                       type: string
         *                       example: "67b2fd17f6afc068678f14b5"
         *                     claim_name:
         *                       type: string
         *                       example: "Request OT"
         *                     claim_status:
         *                       type: string
         *                       example: "Draft"
         *                     claim_start_date:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-11T08:48:36.083Z"
         *                     claim_end_date:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-13T08:48:36.083Z"
         *                     total_work_time:
         *                       type: number
         *                       example: 8
         *                     is_deleted:
         *                       type: boolean
         *                       example: false
         *                     _id:
         *                       type: string
         *                       example: "67b93c4db74349d8a681d145"
         *                     created_at:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-22T02:54:05.055Z"
         *                     updated_at:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-22T02:54:05.055Z"
         *                     __v:
         *                       type: number
         *                       example: 0
         */
        // POST domain:/api/claims -> Create claim
        this.router.post(
            this.path,
            authMiddleWare(),
            validationMiddleware(CreateClaimDto),
            this.claimController.create,
        );

        /**
         * @swagger
         * /api/claims/search:
         *   post:
         *     summary: Search claims with pagination
         *     tags: [Claim]
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
         *                   claim_status:
         *                     type: string
         *                     example: ''
         *                   claim_start_date:
         *                     type: string
         *                     format: date
         *                     example: ''
         *                   claim_end_date:
         *                     type: string
         *                     format: date
         *                     example: ''
         *                   is_delete:
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
         *         description: List of claims with pagination
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
         *                             example: "67b93c4db74349d8a681d145"
         *                           staff_id:
         *                             type: string
         *                             example: "67b43ca2f4d1e49e5326bb84"
         *                           staff_name:
         *                             type: string
         *                             example: "tamoki1113"
         *                           staff_email:
         *                             type: string
         *                             example: "tamo.ki1110@gmail.com"
         *                           staff_role:
         *                             type: string
         *                             nullable: true
         *                             example: null
         *                           role_in_project:
         *                             type: string
         *                             example: "Developer"
         *                           claim_name:
         *                             type: string
         *                             example: "Request OT"
         *                           claim_start_date:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-11T08:48:36.083Z"
         *                           claim_end_date:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-13T08:48:36.083Z"
         *                           is_deleted:
         *                             type: boolean
         *                             example: false
         *                           created_at:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-22T02:54:05.055Z"
         *                           updated_at:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-22T02:54:05.055Z"
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
        // POST domain:/api/claims/search -> Get items by conditions
        this.router.post(
            API_PATH.CLAIMS_SEARCH,
            authMiddleWare(),
            validationMiddleware(SearchPaginationClaimDto),
            this.claimController.getItems,
        );

        /**
         * @swagger
         * /api/claims/claimer-search:
         *   post:
         *     summary: Search claims for claimer with pagination
         *     tags: [Claim]
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
         *                   claim_status:
         *                     type: string
         *                     example: ''
         *                   claim_start_date:
         *                     type: string
         *                     format: date
         *                     example: ''
         *                   claim_end_date:
         *                     type: string
         *                     format: date
         *                     example: ''
         *                   is_delete:
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
         *         description: List of claims with pagination
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
         *                             example: "67b93c4db74349d8a681d145"
         *                           staff_id:
         *                             type: string
         *                             example: "67b43ca2f4d1e49e5326bb84"
         *                           staff_name:
         *                             type: string
         *                             example: "tamoki1113"
         *                           staff_email:
         *                             type: string
         *                             example: "tamo.ki1110@gmail.com"
         *                           staff_role:
         *                             type: string
         *                             nullable: true
         *                             example: null
         *                           role_in_project:
         *                             type: string
         *                             example: "Developer"
         *                           claim_name:
         *                             type: string
         *                             example: "Request OT"
         *                           claim_start_date:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-11T08:48:36.083Z"
         *                           claim_end_date:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-13T08:48:36.083Z"
         *                           is_deleted:
         *                             type: boolean
         *                             example: false
         *                           created_at:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-22T02:54:05.055Z"
         *                           updated_at:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-22T02:54:05.055Z"
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
        // POST domain:/api/claims/claimer-search -> Get items by conditions for claimer
        this.router.post(
            API_PATH.CLAIMS_CLAIMER_SEARCH,
            authMiddleWare(),
            validationMiddleware(SearchPaginationClaimDto),
            this.claimController.getItemsForClaimer,
        );

        /**
         * @swagger
         * /api/claims/approval-search:
         *   post:
         *     summary: Search claims for approval with pagination
         *     tags: [Claim]
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
         *                   claim_status:
         *                     type: string
         *                     example: ''
         *                   claim_start_date:
         *                     type: string
         *                     format: date
         *                     example: ''
         *                   claim_end_date:
         *                     type: string
         *                     format: date
         *                     example: ''
         *                   is_delete:
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
         *         description: List of claims with pagination
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
         *                             example: "67b93c4db74349d8a681d145"
         *                           staff_id:
         *                             type: string
         *                             example: "67b43ca2f4d1e49e5326bb84"
         *                           staff_name:
         *                             type: string
         *                             example: "tamoki1113"
         *                           staff_email:
         *                             type: string
         *                             example: "tamo.ki1110@gmail.com"
         *                           staff_role:
         *                             type: string
         *                             nullable: true
         *                             example: null
         *                           role_in_project:
         *                             type: string
         *                             example: "Developer"
         *                           claim_name:
         *                             type: string
         *                             example: "Request OT"
         *                           claim_start_date:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-11T08:48:36.083Z"
         *                           claim_end_date:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-13T08:48:36.083Z"
         *                           is_deleted:
         *                             type: boolean
         *                             example: false
         *                           created_at:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-22T02:54:05.055Z"
         *                           updated_at:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-22T02:54:05.055Z"
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
        // POST domain:/api/claims/approval-search -> Get items by conditions for approval
        this.router.post(
            API_PATH.CLAIMS_APPROVAL_SEARCH,
            authMiddleWare([BaseRoleCode.A003]),
            validationMiddleware(SearchPaginationClaimDto),
            this.claimController.getItemsForApproval,
        );

        /**
         * @swagger
         * /api/claims/finance-search:
         *   post:
         *     summary: Search claims for finance with pagination
         *     tags: [Claim]
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
         *                   claim_status:
         *                     type: string
         *                     example: ''
         *                   claim_start_date:
         *                     type: string
         *                     format: date
         *                     example: ''
         *                   claim_end_date:
         *                     type: string
         *                     format: date
         *                     example: ''
         *                   is_delete:
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
         *         description: List of claims with pagination
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
         *                             example: "67b93c4db74349d8a681d145"
         *                           staff_id:
         *                             type: string
         *                             example: "67b43ca2f4d1e49e5326bb84"
         *                           staff_name:
         *                             type: string
         *                             example: "tamoki1113"
         *                           staff_email:
         *                             type: string
         *                             example: "tamo.ki1110@gmail.com"
         *                           staff_role:
         *                             type: string
         *                             nullable: true
         *                             example: null
         *                           role_in_project:
         *                             type: string
         *                             example: "Developer"
         *                           claim_name:
         *                             type: string
         *                             example: "Request OT"
         *                           claim_start_date:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-11T08:48:36.083Z"
         *                           claim_end_date:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-13T08:48:36.083Z"
         *                           is_deleted:
         *                             type: boolean
         *                             example: false
         *                           created_at:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-22T02:54:05.055Z"
         *                           updated_at:
         *                             type: string
         *                             format: date-time
         *                             example: "2025-02-22T02:54:05.055Z"
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
        // POST domain:/api/claims/finance-search -> Get items by conditions for finance
        this.router.post(
            API_PATH.CLAIMS_FINANCE_SEARCH,
            authMiddleWare([BaseRoleCode.A001, BaseRoleCode.A002]),
            validationMiddleware(SearchPaginationClaimDto),
            this.claimController.getItemsForFinance,
        );

        /**
         * @swagger
         * /api/claims/{id}:
         *   get:
         *     summary: Get claim by ID
         *     tags: [Claim]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: string
         *         required: true
         *         description: The Claim ID
         *     responses:
         *       200:
         *         description: Claim data
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
         *                       example: "67b93c4db74349d8a681d145"
         *                     user_id:
         *                       type: string
         *                       example: "678e17134e6e72ce391d0946"
         *                     project_id:
         *                       type: string
         *                       example: "67b43d15f4d1e49e5326bb8e"
         *                     approval_id:
         *                       type: string
         *                       example: "67b2fd17f6afc068678f14b5"
         *                     claim_name:
         *                       type: string
         *                       example: "Request OT"
         *                     claim_status:
         *                       type: string
         *                       example: "Draft"
         *                     claim_start_date:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-11T08:48:36.083Z"
         *                     claim_end_date:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-13T08:48:36.083Z"
         *                     total_work_time:
         *                       type: integer
         *                       example: 8
         *                     is_deleted:
         *                       type: boolean
         *                       example: false
         *                     created_at:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-22T02:54:05.055Z"
         *                     updated_at:
         *                       type: string
         *                       format: date-time
         *                       example: "2025-02-22T02:54:05.055Z"
         *                     __v:
         *                       type: integer
         *                       example: 0
         */
        // GET domain:/api/claims/:id -> Get claim by id
        this.router.get(`${this.path}/:id`, authMiddleWare(), this.claimController.getItem);

        /**
         * @swagger
         * /api/claims/change-status:
         *   put:
         *     summary: Change claim status
         *     tags: [Claim]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - claim_id
         *               - claim_status
         *             properties:
         *               claim_id:
         *                 type: string
         *                 example: "67b93c4db74349d8a681d145"
         *               claim_status:
         *                 type: string
         *                 example: "Canceled"
         *               comment:
         *                 type: string
         *                 nullable: true
         *                 example: ""
         *     responses:
         *       200:
         *         description: Claim status updated successfully
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
        // PUT domain:/api/claims/change-status -> Change claim status
        this.router.put(
            API_PATH.CLAIMS_CHANGE_STATUS,
            authMiddleWare(),
            validationMiddleware(UpdateClaimStatusDto),
            this.claimController.updateStatus,
        );

        /**
         * @swagger
         * /api/claims/{id}:
         *   put:
         *     summary: Update claim
         *     tags: [Claim]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: string
         *         required: true
         *         description: The claim ID
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
         *                       example: "Claim Manager"
         *     responses:
         *       200:
         *         description: Claim updated successfully
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
         *                             example: "Claim Manager"
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
        // PUT domain:/api/claims/:id -> Update claims
        this.router.put(
            `${this.path}/:id`,
            authMiddleWare(),
            validationMiddleware(UpdateClaimDto),
            this.claimController.update,
        );
    }
}
