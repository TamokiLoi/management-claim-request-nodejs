import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import { DataStoredInToken } from '../../modules/auth';
import { UserSchema } from '../../modules/user';
import { BaseRoleCode, HttpStatus } from '../enums';
import { logger } from '../utils';

const authMiddleWare = (roles?: BaseRoleCode[], isClient = false): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];

        if (isClient) {
            if (!authHeader) {
                req.user = { id: '', role_code: null, version: 0 };
                next();
                return;
            }
        } else {
            if (!authHeader) {
                res.status(HttpStatus.NotFound).json({ message: 'No token, authorization denied.' });
                return;
            }
        }

        await handleCheckToken(req, res, next, authHeader, roles);
    };
};

const handleCheckToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
    authHeader: string | undefined,
    roles?: BaseRoleCode[] | string[],
): Promise<void> => {
    const userSchema = UserSchema;

    if (!authHeader) {
        res.status(HttpStatus.NotFound).json({ message: 'Authorization header is missing' });
        return;
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
        res.status(HttpStatus.NotFound).json({ message: 'Invalid token format' });
        return;
    }

    try {
        const userToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET ?? '') as DataStoredInToken;
        req.user = req.user || { id: '', role_code: null, version: 0 };
        req.user.id = userToken.id;
        req.user.role_code = userToken.role_code;
        req.user.version = userToken.version;

        const user = await userSchema.findOne({ _id: userToken.id, is_deleted: false, is_verified: true }).lean();
        if (!user || Number(user?.token_version?.toString() || 0) !== userToken.version) {
            res.status(HttpStatus.Forbidden).json({ message: 'Access denied: invalid token!' });
            return;
        }

        if (roles && roles.length > 0 && (!req.user.role_code || !roles.includes(req.user.role_code))) {
            res.status(HttpStatus.Forbidden).json({ message: 'Access denied: insufficient role' });
            return;
        }

        next();
    } catch (error) {
        logger.error(`[ERROR] Msg: ${error instanceof Error ? error.message : error}`);
        if (error instanceof Error) {
            if (error.name === 'TokenExpiredError') {
                res.status(HttpStatus.Forbidden).json({ message: 'Token is expired' });
            } else {
                res.status(HttpStatus.Forbidden).json({ message: 'Token is not valid' });
            }
        } else {
            res.status(HttpStatus.InternalServerError).json({ message: 'An unknown error occurred' });
        }
        return;
    }
};

export default authMiddleWare;
