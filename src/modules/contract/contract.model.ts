import mongoose, { Schema } from 'mongoose';
import { COLLECTION_NAME } from '../../core/constants';
import { BaseModelFields } from '../../core/models';
import { ContractFieldName } from './contract.enum';
import { IContract } from './contract.interface';

const ContractSchemaEntity: Schema<IContract> = new Schema({
    [ContractFieldName.CONTRACT_TYPE]: { type: String, unique: true, index: true },
    [ContractFieldName.DESCRIPTION]: { type: String },
    ...BaseModelFields,
});

const ContractSchema = mongoose.model<IContract & mongoose.Document>(COLLECTION_NAME.CONTRACT, ContractSchemaEntity);
export default ContractSchema;
