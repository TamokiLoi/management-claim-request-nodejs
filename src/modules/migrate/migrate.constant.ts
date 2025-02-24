import { BaseContractType, BaseJobName, BaseJobRank, BaseRoleCode } from '../../core/enums';
import { ContractFieldName } from '../contract';
import { DepartmentFieldName } from '../department/department.enum';
import { JobFieldName } from '../job';
import { RoleFieldName } from '../role';
import { CreateUserDto } from '../user';

export const DEFAULT_ROLES = [
    {
        [RoleFieldName.ROLE_CODE]: BaseRoleCode.A001,
        [RoleFieldName.ROLE_NAME]: BaseJobName.ADMIN,
        [RoleFieldName.DESCRIPTION]: 'System administrator',
    },
    {
        [RoleFieldName.ROLE_CODE]: BaseRoleCode.A002,
        [RoleFieldName.ROLE_NAME]: BaseJobName.FINANCE,
        [RoleFieldName.DESCRIPTION]: 'Finance manager',
    },
    {
        [RoleFieldName.ROLE_CODE]: BaseRoleCode.A003,
        [RoleFieldName.ROLE_NAME]: 'Approval',
        [RoleFieldName.DESCRIPTION]: 'BUL, PM',
    },
    {
        [RoleFieldName.ROLE_CODE]: BaseRoleCode.A004,
        [RoleFieldName.ROLE_NAME]: 'Claimer',
        [RoleFieldName.DESCRIPTION]: 'All Members Remaining',
    },
];

export const DEFAULT_JOBS = [
    { [JobFieldName.JOB_RANK]: BaseJobRank.ADMIN, [JobFieldName.JOB_TITLE]: BaseJobName.ADMIN },
    { [JobFieldName.JOB_RANK]: BaseJobRank.FI1, [JobFieldName.JOB_TITLE]: BaseJobName.FINANCE },
    { [JobFieldName.JOB_RANK]: BaseJobRank.FI2, [JobFieldName.JOB_TITLE]: BaseJobName.FINANCE },
    { [JobFieldName.JOB_RANK]: BaseJobRank.FI3, [JobFieldName.JOB_TITLE]: BaseJobName.FINANCE },
    { [JobFieldName.JOB_RANK]: BaseJobRank.BUL, [JobFieldName.JOB_TITLE]: BaseJobName.BUL },
    { [JobFieldName.JOB_RANK]: BaseJobRank.PM1, [JobFieldName.JOB_TITLE]: BaseJobName.PM },
    { [JobFieldName.JOB_RANK]: BaseJobRank.PM2, [JobFieldName.JOB_TITLE]: BaseJobName.PM },
    { [JobFieldName.JOB_RANK]: BaseJobRank.PM3, [JobFieldName.JOB_TITLE]: BaseJobName.PM },
    { [JobFieldName.JOB_RANK]: BaseJobRank.TL1, [JobFieldName.JOB_TITLE]: BaseJobName.TL },
    { [JobFieldName.JOB_RANK]: BaseJobRank.TL2, [JobFieldName.JOB_TITLE]: BaseJobName.TL },
    { [JobFieldName.JOB_RANK]: BaseJobRank.TL3, [JobFieldName.JOB_TITLE]: BaseJobName.TL },
    { [JobFieldName.JOB_RANK]: BaseJobRank.BA1, [JobFieldName.JOB_TITLE]: BaseJobName.BA },
    { [JobFieldName.JOB_RANK]: BaseJobRank.BA2, [JobFieldName.JOB_TITLE]: BaseJobName.BA },
    { [JobFieldName.JOB_RANK]: BaseJobRank.BA3, [JobFieldName.JOB_TITLE]: BaseJobName.BA },
    { [JobFieldName.JOB_RANK]: BaseJobRank.QA1, [JobFieldName.JOB_TITLE]: BaseJobName.QA },
    { [JobFieldName.JOB_RANK]: BaseJobRank.QA2, [JobFieldName.JOB_TITLE]: BaseJobName.QA },
    { [JobFieldName.JOB_RANK]: BaseJobRank.QA3, [JobFieldName.JOB_TITLE]: BaseJobName.QA },
    { [JobFieldName.JOB_RANK]: BaseJobRank.DEV1, [JobFieldName.JOB_TITLE]: BaseJobName.DEV },
    { [JobFieldName.JOB_RANK]: BaseJobRank.DEV2, [JobFieldName.JOB_TITLE]: BaseJobName.DEV },
    { [JobFieldName.JOB_RANK]: BaseJobRank.DEV3, [JobFieldName.JOB_TITLE]: BaseJobName.DEV },
    { [JobFieldName.JOB_RANK]: BaseJobRank.TEST1, [JobFieldName.JOB_TITLE]: BaseJobName.TEST },
    { [JobFieldName.JOB_RANK]: BaseJobRank.TEST2, [JobFieldName.JOB_TITLE]: BaseJobName.TEST },
    { [JobFieldName.JOB_RANK]: BaseJobRank.TEST3, [JobFieldName.JOB_TITLE]: BaseJobName.TEST },
    { [JobFieldName.JOB_RANK]: BaseJobRank.TC1, [JobFieldName.JOB_TITLE]: BaseJobName.TC },
    { [JobFieldName.JOB_RANK]: BaseJobRank.TC2, [JobFieldName.JOB_TITLE]: BaseJobName.TC },
    { [JobFieldName.JOB_RANK]: BaseJobRank.TC3, [JobFieldName.JOB_TITLE]: BaseJobName.TC },
];

export const DEFAULT_DEPARTMENTS = [
    {
        [DepartmentFieldName.DEPARTMENT_CODE]: 'DE01',
        [DepartmentFieldName.DEPARTMENT_NAME]: 'Department 01',
        [RoleFieldName.DESCRIPTION]: 'Department 01',
    },
    {
        [DepartmentFieldName.DEPARTMENT_CODE]: 'DE02',
        [DepartmentFieldName.DEPARTMENT_NAME]: 'Department 02',
        [RoleFieldName.DESCRIPTION]: 'Department 02',
    },
    {
        [DepartmentFieldName.DEPARTMENT_CODE]: 'DE03',
        [DepartmentFieldName.DEPARTMENT_NAME]: 'Department 03',
        [RoleFieldName.DESCRIPTION]: 'Department 03',
    },
    {
        [DepartmentFieldName.DEPARTMENT_CODE]: 'DE04',
        [DepartmentFieldName.DEPARTMENT_NAME]: 'Department 04',
        [RoleFieldName.DESCRIPTION]: 'Department 04',
    },
];

export const DEFAULT_ADMIN = new CreateUserDto(
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

export const DEFAULT_CONTRACTS = [
    { [ContractFieldName.CONTRACT_TYPE]: BaseContractType.ONE_YEAR, [ContractFieldName.DESCRIPTION]: 'Contract limit in one year.' },
    { [ContractFieldName.CONTRACT_TYPE]: BaseContractType.THREE_YEAR, [ContractFieldName.DESCRIPTION]: 'Contract limit in three year.' },
    { [ContractFieldName.CONTRACT_TYPE]: BaseContractType.INDEFINITE, [ContractFieldName.DESCRIPTION]: 'Contract no limit time.' },
];
