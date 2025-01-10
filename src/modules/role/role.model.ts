import mongoose, { Schema } from 'mongoose';
import { COLLECTION_NAME } from '../../core/constants';
import { BaseModelFields } from '../../core/models';
import { IRole } from './role.interface';
import { RoleFieldName } from './role.enum';

const RoleSchemaEntity: Schema<IRole> = new Schema({
    [RoleFieldName.ROLE_CODE]: { type: String, unique: true, index: true, required: true },
    [RoleFieldName.ROLE_NAME]: { type: String, unique: true, required: true },
    [RoleFieldName.DESCRIPTION]: { type: String },
    ...BaseModelFields,
});

const RoleSchema = mongoose.model<IRole & mongoose.Document>(COLLECTION_NAME.ROLE, RoleSchemaEntity);
export default RoleSchema;
