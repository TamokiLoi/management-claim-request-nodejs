import mongoose, { Schema } from 'mongoose';
import { COLLECTION_NAME } from '../../core/constants';
import { BaseModelFields } from '../../core/models';
import { DepartmentFieldName } from './department.enum';
import { IDepartment } from './department.interface';

const DepartmentSchemaEntity: Schema<IDepartment> = new Schema({
    [DepartmentFieldName.DEPARTMENT_CODE]: { type: String, unique: true, index: true, required: true },
    [DepartmentFieldName.DEPARTMENT_NAME]: { type: String, unique: true, required: true },
    [DepartmentFieldName.DESCRIPTION]: { type: String },
    ...BaseModelFields,
});

const DepartmentSchema = mongoose.model<IDepartment & mongoose.Document>(
    COLLECTION_NAME.DEPARTMENT,
    DepartmentSchemaEntity,
);
export default DepartmentSchema;
