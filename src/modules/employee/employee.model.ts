import mongoose, { Schema } from 'mongoose';
import { COLLECTION_NAME } from '../../core/constants';
import { BaseContractType, BaseJobRank, BaseJobName } from '../../core/enums';
import { BaseModelFields } from '../../core/models';
import { EmployeeFieldName } from './employee.enum';
import { IEmployee } from './employee.interface';

const EmployeeSchemaEntity: Schema<IEmployee> = new Schema({
    [EmployeeFieldName.USER_ID]: { type: Schema.ObjectId, ref: COLLECTION_NAME.USER, index: true, required: true },
    [EmployeeFieldName.ACCOUNT]: { type: String, required: true },
    [EmployeeFieldName.ADDRESS]: { type: String, required: true },
    [EmployeeFieldName.PHONE]: { type: String, required: true },
    [EmployeeFieldName.FULL_NAME]: { type: String, required: true },
    [EmployeeFieldName.AVATAR_URL]: { type: String, required: true },
    [EmployeeFieldName.DEPARTMENT_NAME]: { type: String, required: true },
    [EmployeeFieldName.JOB_RANK]: { type: String, enum: BaseJobRank, required: true },
    [EmployeeFieldName.JOB_TITLE]: { type: String, enum: BaseJobName, required: true },
    [EmployeeFieldName.SALARY]: { type: Number, required: true },
    [EmployeeFieldName.CONTRACT_TYPE]: {
        type: String,
        enum: BaseContractType,
        default: BaseContractType.ONE_YEAR,
        required: true,
    },
    [EmployeeFieldName.START_DATE]: { type: Date, required: true },
    [EmployeeFieldName.END_DATE]: { type: Date },
    [EmployeeFieldName.UPDATED_BY]: { type: Schema.Types.ObjectId, ref: COLLECTION_NAME.USER },
    ...BaseModelFields,
});

const EmployeeSchema = mongoose.model<IEmployee & mongoose.Document>(COLLECTION_NAME.EMPLOYEE, EmployeeSchemaEntity);
export default EmployeeSchema;
