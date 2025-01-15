import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../core/enums';
import { SearchPaginationResponseModel } from '../../core/models';
import { formatResponse } from '../../core/utils';
import CreateUserDto from './dtos/createUser.dto';
import SearchPaginationUserDto from './dtos/searchPaginationUser.dto';
import { IUser } from './user.interface';
import UserService from './user.service';
import ChangePasswordDto from './dtos/changePassword.dto';

export default class UserController {
    private userService = new UserService();

    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: CreateUserDto = req.body;
            const user: IUser = await this.userService.createUser(model);
            res.status(HttpStatus.Created).json(formatResponse<IUser>(user));
        } catch (error) {
            next(error);
        }
    };

    public getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: SearchPaginationUserDto = req.body;
            const result: SearchPaginationResponseModel<IUser> = await this.userService.getUsers(model);
            res.status(HttpStatus.Success).json(formatResponse<SearchPaginationResponseModel<IUser>>(result));
        } catch (error) {
            next(error);
        }
    };

    public getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: IUser = await this.userService.getUser(req.params.id);
            res.status(HttpStatus.Success).json(formatResponse<IUser>(user));
        } catch (error) {
            next(error);
        }
    };

    public changePassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: ChangePasswordDto = req.body;
            await this.userService.changePassword(model, req.user);
            res.status(HttpStatus.Success).json(formatResponse<null>(null));
        } catch (error) {
            next(error);
        }
    };
}
