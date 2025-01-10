import { Document } from 'mongoose';
import { IBase } from '../../core/interfaces';
import { RoleFieldName } from './role.enum';

export interface IRole extends Document, IBase {
    [RoleFieldName.ID]: string;
    [RoleFieldName.ROLE_CODE]: string;
    [RoleFieldName.ROLE_NAME]: string;
    [RoleFieldName.DESCRIPTION]?: string;
}
