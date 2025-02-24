import mongoose, { Schema } from 'mongoose';
import { COLLECTION_NAME } from '../../../core/constants';
import { BaseModelFields } from '../../../core/models';
import { ClaimStatusEnum } from '../claim.enum';
import { ClaimLogFieldName } from './claimLog.enum';
import { IClaimLog } from './claimLog.interface';

const ClaimLogSchemaEntity: Schema<IClaimLog> = new Schema({
    [ClaimLogFieldName.CLAIM_ID]: { type: Schema.Types.ObjectId, ref: COLLECTION_NAME.CLAIM },
    [ClaimLogFieldName.USER_ID]: { type: Schema.Types.ObjectId, ref: COLLECTION_NAME.USER },
    [ClaimLogFieldName.OLD_STATUS]: {
        type: String,
        enum: ClaimStatusEnum,
    },
    [ClaimLogFieldName.NEW_STATUS]: {
        type: String,
        enum: ClaimStatusEnum,
    },
    [ClaimLogFieldName.COMMENT]: { type: String },
    ...BaseModelFields,
});

const ClaimLogSchema = mongoose.model<IClaimLog & mongoose.Document>(COLLECTION_NAME.CLAIM_LOG, ClaimLogSchemaEntity);
export default ClaimLogSchema;
