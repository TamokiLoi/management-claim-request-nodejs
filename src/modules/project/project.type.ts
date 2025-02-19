import { BaseJobName } from '../../core/enums';
import { ProjectStatusEnum } from './project.enum';

export type ProjectRoleType =
    | BaseJobName.PM
    | BaseJobName.QA
    | BaseJobName.TL
    | BaseJobName.BA
    | BaseJobName.DEV
    | BaseJobName.TEST
    | BaseJobName.TC;

export type ProjectStatusType =
    | ProjectStatusEnum.NEW
    | ProjectStatusEnum.ACTIVE
    | ProjectStatusEnum.PENDING
    | ProjectStatusEnum.CLOSED;
