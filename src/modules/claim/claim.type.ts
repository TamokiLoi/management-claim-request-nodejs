import { ClaimStatusEnum } from './claim.enum';

export type ClaimStatusType =
    | ClaimStatusEnum.DRAFT
    | ClaimStatusEnum.PENDING_APPROVAL
    | ClaimStatusEnum.APPROVED
    | ClaimStatusEnum.PAID
    | ClaimStatusEnum.REJECTED
    | ClaimStatusEnum.CANCELED;
