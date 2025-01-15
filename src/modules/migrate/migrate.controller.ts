import { NextFunction, Request, Response } from 'express';
import { BaseRoleCode, BaseRoleName, HttpStatus } from '../../core/enums';
import { formatResponse } from '../../core/utils';
import { RoleSchema } from '../role';
import { CreateUserDto, IUser, UserService } from '../user';

export default class MigrateController {
    private userService = new UserService();
    private roleSchema = RoleSchema;

    public migrateRoles = async (req: Request, res: Response, next: NextFunction) => {
        const defaultRoles = [
            { role_code: BaseRoleCode.A001, role_name: BaseRoleName.ADMIN, description: 'System administrator' },
            { role_code: BaseRoleCode.A002, role_name: BaseRoleName.FINANCE, description: 'System finance' },
            { role_code: BaseRoleCode.A003, role_name: BaseRoleName.BUL, description: 'Business Unit Lead' },
            { role_code: BaseRoleCode.A004, role_name: BaseRoleName.PM, description: 'Project Management' },
            { role_code: BaseRoleCode.A005, role_name: BaseRoleName.QA, description: 'Quality Analytics' },
            { role_code: BaseRoleCode.A006, role_name: BaseRoleName.TL, description: 'Technical Lead' },
            { role_code: BaseRoleCode.A007, role_name: BaseRoleName.BA, description: 'Business Analytics' },
            { role_code: BaseRoleCode.A008, role_name: BaseRoleName.DEV, description: 'Developer' },
            { role_code: BaseRoleCode.A009, role_name: BaseRoleName.TEST, description: 'Tester' },
            { role_code: BaseRoleCode.A010, role_name: BaseRoleName.TC, description: 'Technical Consultancy' },
        ];

        try {
            const createdRoles = [];
            for (const role of defaultRoles) {
                const exists = await this.roleSchema.findOne({ role_code: role.role_code });
                if (!exists) {
                    const newRole = await RoleSchema.create(role);
                    createdRoles.push(newRole);
                }
            }
            if (createdRoles.length > 0) {
                res.status(HttpStatus.Created).json(formatResponse<any>(createdRoles));
            } else {
                res.status(HttpStatus.Success).json({
                    message: 'All default roles already exist.',
                });
            }
        } catch (error) {
            next(error);
        }
    };

    public migrateUserAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model = new CreateUserDto(
                'admin@gmail.com',
                '123456',
                'admin',
                BaseRoleCode.A001,
                true,
                undefined,
                undefined,
                0,
                false,
                new Date(),
                new Date(),
                false,
            );
            const user: IUser = await this.userService.createUser(model);
            res.status(HttpStatus.Created).json(formatResponse<IUser>(user));
        } catch (error) {
            next(error);
        }
    };
}
