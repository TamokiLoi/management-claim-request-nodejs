import { Document } from 'mongoose';
import { IBase } from '../../core/interfaces';
import { ProjectFieldName } from './project.enum';
import { ProjectRoleType } from './project.type';

export interface IProject extends Document, IBase {
    [ProjectFieldName.ID]: string;
    [ProjectFieldName.PROJECT_NAME]: string;
    [ProjectFieldName.PROJECT_CODE]: string;
    [ProjectFieldName.PROJECT_DEPARTMENT]: string;
    [ProjectFieldName.PROJECT_DESCRIPTION]: string;
    [ProjectFieldName.PROJECT_MEMBERS]: IProjectMember[];
    [ProjectFieldName.PROJECT_STATUS]: string;
    [ProjectFieldName.PROJECT_COMMENT]: string;
    [ProjectFieldName.PROJECT_START_DATE]: Date;
    [ProjectFieldName.PROJECT_END_DATE]: Date;
    [ProjectFieldName.UPDATED_BY]: string | null;
}

export interface IProjectMember {
    user_id: string | null;
    project_role: ProjectRoleType;
}
