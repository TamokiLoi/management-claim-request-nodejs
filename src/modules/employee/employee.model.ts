import mongoose, { Schema } from 'mongoose';
import { COLLECTION_NAME } from '../../core/constants';
import { BaseModelFields } from '../../core/models';
import { EmployeeFieldName } from './employee.enum';
import { IEmployee } from './employee.interface';

const EmployeeSchemaEntity: Schema<IEmployee> = new Schema({
    [EmployeeFieldName.USER_ID]: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME.USER,
        index: true,
    },
    [EmployeeFieldName.JOB_RANK]: { type: Schema.Types.String, ref: COLLECTION_NAME.JOB },
    [EmployeeFieldName.CONTRACT_TYPE]: { type: Schema.Types.String, ref: COLLECTION_NAME.CONTRACT },
    [EmployeeFieldName.ADDRESS]: { type: String },
    [EmployeeFieldName.PHONE]: { type: String },
    [EmployeeFieldName.FULL_NAME]: { type: String },
    [EmployeeFieldName.AVATAR_URL]: { type: String },
    [EmployeeFieldName.DEPARTMENT_NAME]: { type: String },
    [EmployeeFieldName.SALARY]: { type: Number },
    [EmployeeFieldName.START_DATE]: { type: Date },
    [EmployeeFieldName.END_DATE]: { type: Date },
    [EmployeeFieldName.UPDATED_BY]: { type: Schema.Types.ObjectId, ref: COLLECTION_NAME.USER },
    ...BaseModelFields,
});

const EmployeeSchema = mongoose.model<IEmployee & mongoose.Document>(COLLECTION_NAME.EMPLOYEE, EmployeeSchemaEntity);
export default EmployeeSchema;
