import { Document } from 'mongoose';
import { IBase } from '../../../core/interfaces';
import { ClaimLogFieldName } from './claimLog.enum';

export interface IClaimLog extends Document, IBase {
    [ClaimLogFieldName.ID]: string;
    [ClaimLogFieldName.CLAIM_ID]: string | null;
    [ClaimLogFieldName.USER_ID]: string | null;
    [ClaimLogFieldName.OLD_STATUS]: string;
    [ClaimLogFieldName.NEW_STATUS]: string;
    [ClaimLogFieldName.COMMENT]: string;
}
