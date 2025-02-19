import mongoose, { Schema } from 'mongoose';
import { COLLECTION_NAME } from '../../core/constants';
import { BaseModelFields } from '../../core/models';
import { JobFieldName } from './job.enum';
import { IJob } from './job.interface';

const JobSchemaEntity: Schema<IJob> = new Schema({
    [JobFieldName.JOB_RANK]: { type: String, unique: true, index: true, required: true },
    [JobFieldName.JOB_TITLE]: { type: String, required: true },
    ...BaseModelFields,
});

const JobSchema = mongoose.model<IJob & mongoose.Document>(COLLECTION_NAME.JOB, JobSchemaEntity);
export default JobSchema;
