import { Router } from 'express';
import { API_PATH } from '../../core/constants';
import { IRoute } from '../../core/interfaces';
import UserController from './user.controller';

export default class UserRoute implements IRoute {
    public path = API_PATH.USERS;
    public router = Router();
    public userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // GET domain:/api/users/:id -> Get user by id
        this.router.get(`${this.path}/:id`, this.userController.getUser);
    }
}
