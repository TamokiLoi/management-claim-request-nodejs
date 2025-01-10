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
        // GET domain:/api/migrate/roles -> Migrate User admin default
        this.router.get(API_PATH.MIGRATE_ROLES, this.migrateController.migrateRoles);

        // GET domain:/api/migrate/user-admin -> Migrate User admin default
        this.router.get(API_PATH.MIGRATE_USER_ADMIN, this.migrateController.migrateUserAdmin);
    }
}
