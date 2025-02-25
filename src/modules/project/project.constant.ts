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

export const ProjectJobData = [
    { name: BaseJobName.PM, value: BaseJobName.PM },
    { name: BaseJobName.QA, value: BaseJobName.QA },
    { name: BaseJobName.TL, value: BaseJobName.TL },
    { name: BaseJobName.BA, value: BaseJobName.BA },
    { name: BaseJobName.DEV, value: BaseJobName.DEV },
    { name: BaseJobName.TEST, value: BaseJobName.TEST },
    { name: BaseJobName.TC, value: BaseJobName.TC },
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
