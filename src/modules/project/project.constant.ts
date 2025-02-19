import { BaseJobName } from '../../core/enums';
import { ProjectStatusEnum } from './project.enum';

export const ProjectJobList = [
    BaseJobName.PM,
    BaseJobName.QA,
    BaseJobName.TL,
    BaseJobName.BA,
    BaseJobName.DEV,
    BaseJobName.TEST,
    BaseJobName.TC,
];

export const ProjectStatusList = [
    '',
    ProjectStatusEnum.NEW,
    ProjectStatusEnum.ACTIVE,
    ProjectStatusEnum.PENDING,
    ProjectStatusEnum.CLOSED,
];

export const VALID_STATUS_CHANGE_PAIRS = [
    [ProjectStatusEnum.NEW, ProjectStatusEnum.ACTIVE],
    [ProjectStatusEnum.NEW, ProjectStatusEnum.PENDING],
    [ProjectStatusEnum.NEW, ProjectStatusEnum.CLOSED],
    [ProjectStatusEnum.ACTIVE, ProjectStatusEnum.PENDING],
    [ProjectStatusEnum.ACTIVE, ProjectStatusEnum.CLOSED],
    [ProjectStatusEnum.PENDING, ProjectStatusEnum.ACTIVE],
    [ProjectStatusEnum.PENDING, ProjectStatusEnum.CLOSED],
];
