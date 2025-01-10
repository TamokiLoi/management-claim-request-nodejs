import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../core/enums';
import { formatResponse } from '../../core/utils';
import { IUser } from './user.interface';
import UserService from './user.service';

export default class UserController {
    private userService = new UserService();

    public getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: IUser = await this.userService.getUser(req.params.id);
            res.status(HttpStatus.Success).json(formatResponse<IUser>(user));
        } catch (error) {
            next(error);
        }
    };
}
