import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../core/enums';
import { formatResponse } from '../../core/utils';
import { IUser } from '../user';
import { TokenData } from './auth.interface';
import AuthService from './auth.service';
import LoginDto from './dto/login.dto';

export default class AuthController {
    private authService = new AuthService();

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: LoginDto = req.body;
            const tokenData: TokenData = await this.authService.login(model);
            res.status(HttpStatus.Success).json(formatResponse<TokenData>(tokenData));
        } catch (error) {
            next(error);
        }
    };

    public logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.authService.logout(req.user.id);
            res.status(HttpStatus.Success).json(formatResponse<null>(null));
        } catch (error) {
            next(error);
        }
    };

    public getLoginUserInfo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: IUser = await this.authService.getLoginUserInfo(req.user.id);
            res.status(HttpStatus.Success).json(formatResponse<IUser>(user));
        } catch (error) {
            next(error);
        }
    };

    public verifiedToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.authService.verifiedTokenUser(req.body.token);
            res.status(HttpStatus.Success).json(formatResponse<null>(null));
        } catch (error) {
            next(error);
        }
    };

    public resendToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.authService.resendTokenUser(req.body.email);
            res.status(HttpStatus.Success).json(formatResponse<null>(null));
        } catch (error) {
            next(error);
        }
    };

    public forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.authService.forgotPassword(req.body.email);
            res.status(HttpStatus.Success).json(formatResponse<null>(null));
        } catch (error) {
            next(error);
        }
    };

    public triggerVerifiedToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.authService.triggerVerifiedTokenUser(req.body.email);
            res.status(HttpStatus.Success).json(formatResponse<null>(null));
        } catch (error) {
            next(error);
        }
    }
}
