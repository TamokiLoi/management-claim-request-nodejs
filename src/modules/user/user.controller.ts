import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../core/enums';
import { SearchPaginationResponseModel } from '../../core/models';
import { formatResponse } from '../../core/utils';
import ChangePasswordDto from './dtos/changePassword.dto';
import ChangeRoleDto from './dtos/changeRole.dto';
import ChangeStatusDto from './dtos/changeStatus.dto';
import CreateUserDto from './dtos/createUser.dto';
import SearchPaginationUserDto from './dtos/searchPaginationUser.dto';
import { IUser } from './user.interface';
import UserService from './user.service';
import UpdateUserDto from './dtos/updateUser.dto';

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

    public changeStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: ChangeStatusDto = req.body;
            await this.userService.changeStatus(model);
            res.status(HttpStatus.Success).json(formatResponse<null>(null));
        } catch (error) {
            next(error);
        }
    };

    public changeRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: ChangeRoleDto = req.body;
            await this.userService.changeRole(model);
            res.status(HttpStatus.Success).json(formatResponse<null>(null));
        } catch (error) {
            next(error);
        }
    };

    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: UpdateUserDto = req.body;
            const user: IUser = await this.userService.updateUser(req.params.id, model);
            res.status(HttpStatus.Success).json(formatResponse<IUser>(user));
        } catch (error) {
            next(error);
        }
    };

    public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.userService.deleteUser(req.params.id);
            res.status(HttpStatus.Success).json(formatResponse<null>(null));
        } catch (error) {
            next(error);
        }
    };
}
