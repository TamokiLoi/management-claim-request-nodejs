import mongoose, { Schema } from 'mongoose';
import { COLLECTION_NAME } from '../../core/constants';
import { BaseModelFields } from '../../core/models';
import { UserFieldName } from './user.enum';
import { IUser } from './user.interface';

const UserSchemaEntity: Schema<IUser> = new Schema({
    [UserFieldName.EMAIL]: { type: String, unique: true, index: true, required: true },
    [UserFieldName.PASSWORD]: { type: String, required: true },
    [UserFieldName.USER_NAME]: { type: String, required: true },
    [UserFieldName.PHONE]: { type: String },
    [UserFieldName.FULL_NAME]: { type: String },
    [UserFieldName.AVATAR_URL]: { type: String },
    [UserFieldName.ROLE_CODE]: { type: Schema.Types.String, ref: COLLECTION_NAME.ROLE, required: true },
    ...BaseModelFields,
});

const UserSchema = mongoose.model<IUser & mongoose.Document>(COLLECTION_NAME.USER, UserSchemaEntity);
export default UserSchema;
