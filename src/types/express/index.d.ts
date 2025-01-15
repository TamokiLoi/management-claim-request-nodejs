declare namespace Express {
    interface Request {
        user: {
            id: string;
            role_code: BaseRoleCode | string;
            version: number;
        };
    }
}
