import { Router } from 'express';
import { API_PATH } from '../../core/constants';
import { IRoute } from '../../core/interfaces';
import { authMiddleWare, validationMiddleware } from '../../core/middleware';
import AuthController from './auth.controller';
import LoginDto from './dto/login.dto';
import { BaseRoleCode } from '../../core/enums';

export default class AuthRoute implements IRoute {
    public path = API_PATH.AUTH;
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /**
         * @swagger
         * tags:
         *   - name: Auth
         *     description: Authentication related endpoints
         */

        /**
         * @swagger
         * /api/auth:
         *   post:
         *     summary: Login with email and password
         *     security:
         *      - Bearer: []
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *                 example: admin@gmail.com
         *               password:
         *                 type: string
         *                 example: 123456
         *     responses:
         *       200:
         *         description: Successful login
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
         *                     token:
         *                       type: string
         *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2JjZDk5NWNlMzczNmIwOGRlMWNiNyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxOTU0OTU3MiwiZXhwIjoxNzE5NTc4MzcyfQ.cGdNzkKJ8lw8-7oduG0pU3fyQwEadFS_H6IAer7IFh4
         */
        // POST domain:/api/auth -> Login
        this.router.post(this.path, validationMiddleware(LoginDto), this.authController.login);

        /**
         * @swagger
         * /api/auth/logout:
         *   post:
         *     summary: Logout User
         *     tags:
         *       - Auth
         *     responses:
         *       200:
         *         description: Successful logout
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   example: true
         *                 data:
         *                   type: string
         *                   nullable: true
         *                   example: null
         */
        // POST domain:/api/auth/logout -> Logout
        this.router.post(API_PATH.AUTH_LOGOUT, authMiddleWare(), this.authController.logout);

        /**
         * @swagger
         * /api/auth:
         *   get:
         *     summary: Get login user information
         *     tags: [Auth]
         *     responses:
         *       200:
         *         description: Get login user information
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
         *                       example: 2025-01-14T07:25:48.526Z
         *                     token_version:
         *                       type: number
         *                       example: 0
         *                     is_blocked:
         *                       type: boolean
         *                       example: false
         *                     created_at:
         *                       type: string
         *                       example: 2025-01-14T07:25:48.526Z
         *                     updated_at:
         *                       type: string
         *                       example: 2025-01-14T07:25:48.526Z
         *                     is_deleted:
         *                       type: boolean
         *                       example: false
         *                     __v:
         *                       type: number
         *                       example: 0
         */
        // GET domain:/api/auth -> Login User Info
        this.router.get(this.path, authMiddleWare(), this.authController.getLoginUserInfo);

        /**
         * @swagger
         * /api/auth/verify-token:
         *   post:
         *     summary: Verify Token user
         *     security:
         *      - Bearer: []
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               token:
         *                 type: string
         *                 example: a6b29f364e255de7815d265c8708bb28
         *     responses:
         *       200:
         *         description: Token verified
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
         *                   example: null
         */
        // POST domain:/api/auth/verify-token -> Verified token user
        this.router.post(API_PATH.AUTH_VERIFY_TOKEN, this.authController.verifiedToken);

        /**
         * @swagger
         * /api/auth/resend-token:
         *   post:
         *     summary: Reset Token via Email
         *     security:
         *      - Bearer: []
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *                 example: 123@gmail.com
         *     responses:
         *       200:
         *         description: Resend Token via Email
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
         *                   example: null
         */
        // POST domain:/api/auth/resend-token -> Resend Token via email
        this.router.post(API_PATH.AUTH_RESEND_TOKEN, this.authController.resendToken);

        /**
         * @swagger
         * /api/auth/forgot-password:
         *   put:
         *     summary: Forgot Password
         *     security:
         *      - Bearer: []
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *                 example: 123@gmail.com
         *     responses:
         *       200:
         *         description: New password send to email
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
         *                   example: null
         */
        this.router.put(API_PATH.AUTH_FORGOT_PASSWORD, this.authController.forgotPassword);

        /**
         * @swagger
         * /api/auth/trigger-verify-token:
         *   post:
         *     summary: Trigger Verify user
         *     security:
         *      - Bearer: []
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *                 example: account@gmail.com
         *     responses:
         *       200:
         *         description: User verified
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
         *                   example: null
         */
        // POST domain:/api/auth/trigger-verify-token -> Admin trigger verified user
        this.router.post(
            API_PATH.AUTH_TRIGGER_VERIFY_TOKEN,
            authMiddleWare([BaseRoleCode.A001]),
            this.authController.triggerVerifiedToken,
        );
    }
}
