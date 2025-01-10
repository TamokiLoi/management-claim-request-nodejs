import { Document } from 'mongoose';
import { IBase } from '../../core/interfaces';
import { UserFieldName } from './user.enum';

export interface IUser extends Document, IBase {
    [UserFieldName.ID]: string;
    [UserFieldName.EMAIL]: string;
    [UserFieldName.PASSWORD]?: string;
    [UserFieldName.USER_NAME]: string;
    [UserFieldName.PHONE]: string;
    [UserFieldName.FULL_NAME]: string;
    [UserFieldName.AVATAR_URL]: string;
    [UserFieldName.ROLE_CODE]: string | null;
}
