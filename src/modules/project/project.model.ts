import mongoose, { Schema } from 'mongoose';
import { COLLECTION_NAME } from '../../core/constants';
import { BaseModelFields } from '../../core/models';
import { ProjectJobList } from './project.constant';
import { ProjectFieldName, ProjectStatusEnum } from './project.enum';
import { IProject } from './project.interface';

const ProjectSchemaEntity: Schema<IProject> = new Schema({
    [ProjectFieldName.PROJECT_NAME]: { type: String, unique: true, index: true },
    [ProjectFieldName.PROJECT_CODE]: { type: String, unique: true, index: true },
    [ProjectFieldName.PROJECT_DEPARTMENT]: { type: String },
    [ProjectFieldName.PROJECT_DESCRIPTION]: { type: String },
    [ProjectFieldName.PROJECT_MEMBERS]: [
        {
            user_id: { type: Schema.Types.ObjectId, ref: COLLECTION_NAME.USER },
            project_role: { type: String, enum: ProjectJobList },
        },
    ],
    [ProjectFieldName.PROJECT_STATUS]: {
        type: String,
        enum: ProjectStatusEnum,
        default: ProjectStatusEnum.NEW,
    },
    [ProjectFieldName.PROJECT_COMMENT]: { type: String },
    [ProjectFieldName.PROJECT_START_DATE]: { type: Date },
    [ProjectFieldName.PROJECT_END_DATE]: { type: Date },
    [ProjectFieldName.UPDATED_BY]: { type: Schema.Types.ObjectId, ref: COLLECTION_NAME.USER },
    ...BaseModelFields,
});

const ProjectSchema = mongoose.model<IProject & mongoose.Document>(COLLECTION_NAME.PROJECT, ProjectSchemaEntity);
export default ProjectSchema;
