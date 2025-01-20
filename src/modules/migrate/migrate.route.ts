import { Router } from 'express';
import { API_PATH } from '../../core/constants';
import { IRoute } from '../../core/interfaces';
import MigrateController from './migrate.controller';

export default class MigrateRoute implements IRoute {
    public path = API_PATH.MIGRATE;
    public router = Router();
    public migrateController = new MigrateController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /**
         * @swagger
         * tags:
         *   - name: Migrate
         *     description: Migration related endpoints
         */

        /**
         * @swagger
         * /api/migrate/roles:
         *   get:
         *     summary: Migration Roles default
         *     security:
         *      - Bearer: []
         *     tags: [Migrate]
         *     responses:
         *       200:
         *         description: Migration Roles default
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
         *                         example: 67875e33e96a10973576a45b
         *                       role_code:
         *                         type: string
         *                         example: A001
         *                       role_name:
         *                         type: string
         *                         example: Administrator
         *                       description:
         *                         type: string
         *                         example: System administrator
         *                       is_deleted:
         *                         type: boolean
         *                         example: false
         *                       created_at:
         *                         type: string
         *                         format: date-time
         *                         example: 2025-01-15T07:05:23.657Z
         *                       updated_at:
         *                         type: string
         *                         format: date-time
         *                         example: 2025-01-15T07:05:23.657Z
         *                       __v:
         *                         type: integer
         *                         example: 0
         */
        // GET domain:/api/migrate/roles -> Migrate Roles default
        this.router.get(API_PATH.MIGRATE_ROLES, this.migrateController.migrateRoles);

        /**
         * @swagger
         * /api/migrate/jobs:
         *   get:
         *     summary: Fetch migration jobs
         *     security:
         *       - Bearer: []
         *     tags: [Migrate]
         *     responses:
         *       200:
         *         description: List of migration jobs
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
         *                         example: 678e034ea76e35135ab72660
         *                       job_rank:
         *                         type: string
         *                         example: Admin
         *                       job_title:
         *                         type: string
         *                         example: Administrator
         *                       is_deleted:
         *                         type: boolean
         *                         example: false
         *                       created_at:
         *                         type: string
         *                         format: date-time
         *                         example: 2025-01-20T08:03:26.169Z
         *                       updated_at:
         *                         type: string
         *                         format: date-time
         *                         example: 2025-01-20T08:03:26.169Z
         *                       __v:
         *                         type: integer
         *                         example: 0
         */
        // GET domain:/api/migrate/jobs -> Migrate Jobs default
        this.router.get(API_PATH.MIGRATE_JOBS, this.migrateController.migrateJobs);

        /**
         * @swagger
         * /api/migrate/user-admin:
         *   get:
         *     summary: Migration User Admin
         *     security:
         *      - Bearer: []
         *     tags: [Migrate]
         *     responses:
         *       200:
         *         description: Migration User Admin
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
         *                       example: 67875f3a3baa4962e6b0f4ea
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
         *                       example: 2025-01-15T07:09:45.931Z
         *                     token_version:
         *                       type: integer
         *                       example: 0
         *                     is_blocked:
         *                       type: boolean
         *                       example: false
         *                     created_at:
         *                       type: string
         *                       format: date-time
         *                       example: 2025-01-15T07:09:45.931Z
         *                     updated_at:
         *                       type: string
         *                       format: date-time
         *                       example: 2025-01-15T07:09:45.931Z
         *                     is_deleted:
         *                       type: boolean
         *                       example: false
         *                     __v:
         *                       type: integer
         *                       example: 0
         */
        // GET domain:/api/migrate/user-admin -> Migrate User admin default
        this.router.get(API_PATH.MIGRATE_USER_ADMIN, this.migrateController.migrateUserAdmin);
    }
}
