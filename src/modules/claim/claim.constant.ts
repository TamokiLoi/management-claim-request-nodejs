import { BaseRoleCode } from '../../core/enums';
import { ClaimStatusEnum } from './claim.enum';

export const ClaimStatusList = [
    '',
    ClaimStatusEnum.DRAFT,
    ClaimStatusEnum.PENDING_APPROVAL,
    ClaimStatusEnum.APPROVED,
    ClaimStatusEnum.REJECTED,
    ClaimStatusEnum.CANCELED,
    ClaimStatusEnum.PAID,
];

export const VALID_STATUS_CHANGE_PERMISSION_PAIRS = [
    [
        ClaimStatusEnum.DRAFT,
        ClaimStatusEnum.PENDING_APPROVAL,
        [BaseRoleCode.A002, BaseRoleCode.A003, BaseRoleCode.A004],
    ],
    [ClaimStatusEnum.DRAFT, ClaimStatusEnum.CANCELED, [BaseRoleCode.A002, BaseRoleCode.A003, BaseRoleCode.A004]],
    [ClaimStatusEnum.PENDING_APPROVAL, ClaimStatusEnum.DRAFT, [BaseRoleCode.A003]],
    [ClaimStatusEnum.PENDING_APPROVAL, ClaimStatusEnum.APPROVED, [BaseRoleCode.A003]],
    [ClaimStatusEnum.PENDING_APPROVAL, ClaimStatusEnum.REJECTED, [BaseRoleCode.A003]],
    [ClaimStatusEnum.APPROVED, ClaimStatusEnum.PAID, [BaseRoleCode.A002]],
];
