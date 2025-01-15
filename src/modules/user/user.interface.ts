import { Document } from 'mongoose';
import { BaseRoleCode } from '../../core/enums';
import { IBase } from '../../core/interfaces';
import { UserFieldName } from './user.enum';

export interface IUser extends Document, IBase {
    [UserFieldName.ID]: string;
    [UserFieldName.EMAIL]: string;
    [UserFieldName.PASSWORD]?: string;
    [UserFieldName.USER_NAME]: string;
    [UserFieldName.ROLE_CODE]: BaseRoleCode;

    // check verify
    [UserFieldName.IS_VERIFIED]?: boolean; // default false,
    [UserFieldName.VERIFICATION_TOKEN]?: string; // default empty
    [UserFieldName.VERIFICATION_TOKEN_EXPIRES]?: Date; // default new Date()

    // check login/logout
    [UserFieldName.TOKEN_VERSION]: number; // default 0

    [UserFieldName.IS_BLOCKED]: boolean; // default false
}
