import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../core/enums';
import { formatResponse } from '../../core/utils';
import { JobFieldName, JobSchema } from '../job';
import { RoleFieldName, RoleSchema } from '../role';
import { IUser, UserService } from '../user';
import { DEFAULT_ADMIN, DEFAULT_JOBS, DEFAULT_ROLES } from './migrate.constant';

export default class MigrateController {
    private userService = new UserService();
    private roleSchema = RoleSchema;
    private jobSchema = JobSchema;

    public migrateRoles = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createdItems = [];
            for (const item of DEFAULT_ROLES) {
                const exists = await this.roleSchema.findOne({ role_code: item[RoleFieldName.ROLE_CODE] });
                if (!exists) {
                    const newItem = await this.roleSchema.create(item);
                    createdItems.push(newItem);
                }
            }
            if (createdItems.length > 0) {
                res.status(HttpStatus.Created).json(formatResponse<any>(createdItems));
            } else {
                res.status(HttpStatus.Success).json({
                    message: 'All default roles already exist.',
                });
            }
        } catch (error) {
            next(error);
        }
    };

    public migrateJobs = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createItems = [];
            for (const item of DEFAULT_JOBS) {
                const exists = await this.jobSchema.findOne({ job_rank: item[JobFieldName.JOB_RANK] });
                if (!exists) {
                    const newItem = await this.jobSchema.create(item);
                    createItems.push(newItem);
                }
            }
            if (createItems.length > 0) {
                res.status(HttpStatus.Created).json(formatResponse<any>(createItems));
            } else {
                res.status(HttpStatus.Success).json({
                    message: 'All default jobs already exist.',
                });
            }
        } catch (error) {
            next(error);
        }
    };

    public migrateUserAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: IUser = await this.userService.createUser(DEFAULT_ADMIN);
            res.status(HttpStatus.Created).json(formatResponse<IUser>(user));
        } catch (error) {
            next(error);
        }
    };
}
