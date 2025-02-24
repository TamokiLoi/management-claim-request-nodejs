import { Document } from 'mongoose';
import { IBase } from '../../core/interfaces';
import { ClaimFieldName } from './claim.enum';
import { ClaimStatusType } from './claim.type';

export interface IClaim extends Document, IBase {
    [ClaimFieldName.ID]: string;
    [ClaimFieldName.USER_ID]: string | null;
    [ClaimFieldName.PROJECT_ID]: string | null;
    [ClaimFieldName.APPROVAL_ID]: string | null;
    [ClaimFieldName.CLAIM_NAME]: string;
    [ClaimFieldName.CLAIM_STATUS]: ClaimStatusType;
    [ClaimFieldName.CLAIM_START_DATE]: Date;
    [ClaimFieldName.CLAIM_END_DATE]: Date;
    [ClaimFieldName.TOTAL_WORK_TIME]: number;
    [ClaimFieldName.REMARKS]: string;
}
