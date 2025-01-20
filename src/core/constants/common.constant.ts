import { BaseContractType, BaseJobRank, BaseRoleCode, BaseJobName } from '../enums';

export const PAGINATION = {
    pageNum: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
};

export const TIME_LOGIN_EXPIRES = 86400;

export const USER_ROLES = [
    '',
    BaseRoleCode.A001,
    BaseRoleCode.A002,
    BaseRoleCode.A003,
    BaseRoleCode.A004,
];

export const JOB_RANKS = [
    '',
    BaseJobRank.ADMIN,
    BaseJobRank.FI1,
    BaseJobRank.FI2,
    BaseJobRank.FI3,
    BaseJobRank.BUL,
    BaseJobRank.PM1,
    BaseJobRank.PM2,
    BaseJobRank.PM3,
    BaseJobRank.QA1,
    BaseJobRank.QA2,
    BaseJobRank.QA3,
    BaseJobRank.TL1,
    BaseJobRank.TL2,
    BaseJobRank.TL3,
    BaseJobRank.BA1,
    BaseJobRank.BA2,
    BaseJobRank.BA3,
    BaseJobRank.DEV1,
    BaseJobRank.DEV2,
    BaseJobRank.DEV3,
    BaseJobRank.TEST1,
    BaseJobRank.TEST2,
    BaseJobRank.TEST3,
    BaseJobRank.TEST3,
    BaseJobRank.TC1,
    BaseJobRank.TC2,
    BaseJobRank.TC3,
];

export const JOB_TITLES = [
    '',
    BaseJobName.ADMIN,
    BaseJobName.FINANCE,
    BaseJobName.BUL,
    BaseJobName.PM,
    BaseJobName.QA,
    BaseJobName.TL,
    BaseJobName.BA,
    BaseJobName.DEV,
    BaseJobName.TEST,
    BaseJobName.TC,
];

export const CONTRACT_TYPES = ['', BaseContractType.ONE_YEAR, BaseContractType.THREE_YEAR, BaseContractType.INDEFINITE];

// TODO: recheck
export const ROLE_MAP_JOB_RANK: { [key in BaseRoleCode]: BaseJobRank[] } = {
    [BaseRoleCode.A001]: [BaseJobRank.ADMIN],
    [BaseRoleCode.A002]: [BaseJobRank.FI1, BaseJobRank.FI2, BaseJobRank.FI3],
    [BaseRoleCode.A003]: [BaseJobRank.BUL],
    [BaseRoleCode.A004]: [BaseJobRank.PM1, BaseJobRank.PM2, BaseJobRank.PM3],
};
