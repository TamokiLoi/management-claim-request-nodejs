import mongoose, { Schema } from 'mongoose';
import { COLLECTION_NAME } from '../../core/constants';
import { BaseModelFields } from '../../core/models';
import { ClaimFieldName, ClaimStatusEnum } from './claim.enum';
import { IClaim } from './claim.interface';

const ClaimSchemaEntity: Schema<IClaim> = new Schema({
    [ClaimFieldName.USER_ID]: { type: Schema.Types.ObjectId, ref: COLLECTION_NAME.USER },
    [ClaimFieldName.PROJECT_ID]: { type: Schema.Types.ObjectId, ref: COLLECTION_NAME.PROJECT },
    [ClaimFieldName.APPROVAL_ID]: { type: Schema.Types.ObjectId, ref: COLLECTION_NAME.USER },
    [ClaimFieldName.CLAIM_NAME]: { type: String },
    [ClaimFieldName.CLAIM_STATUS]: {
        type: String,
        enum: ClaimStatusEnum,
        default: ClaimStatusEnum.DRAFT,
    },
    [ClaimFieldName.CLAIM_START_DATE]: { type: Date },
    [ClaimFieldName.CLAIM_END_DATE]: { type: Date },
    [ClaimFieldName.TOTAL_WORK_TIME]: { type: Number },
    [ClaimFieldName.REMARKS]: { type: String },
    ...BaseModelFields,
});

const ClaimSchema = mongoose.model<IClaim & mongoose.Document>(COLLECTION_NAME.CLAIM, ClaimSchemaEntity);
export default ClaimSchema;
