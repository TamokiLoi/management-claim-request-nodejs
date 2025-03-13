import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../core/controller';
import { HttpStatus } from '../../core/enums';
import { formatResponse } from '../../core/utils';
import ChangePasswordDto from './dtos/changePassword.dto';
import ChangeRoleDto from './dtos/changeRole.dto';
import ChangeStatusDto from './dtos/changeStatus.dto';
import CreateUserDto from './dtos/createUser.dto';
import SearchPaginationUserDto from './dtos/searchPaginationUser.dto';
import UpdateUserDto from './dtos/updateUser.dto';
import { IUser } from './user.interface';
import UserService from './user.service';

export default class UserController extends BaseController<
    IUser,
    CreateUserDto,
    UpdateUserDto,
    SearchPaginationUserDto
> {
    private userService: UserService;

    constructor() {
        const service = new UserService();
        super(service);
        this.userService = service;
    }

    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: CreateUserDto = req.body;
            const item = await this.userService.create(model, req.user, req.get('Origin'));
            res.status(HttpStatus.Success).json(formatResponse<IUser>(item));
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

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: UpdateUserDto = req.body;
            const user: IUser = await this.userService.update(req.params.id, model);
            res.status(HttpStatus.Success).json(formatResponse<IUser>(user));
        } catch (error) {
            next(error);
        }
    };
}
