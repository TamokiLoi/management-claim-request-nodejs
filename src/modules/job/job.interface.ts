import { Document } from 'mongoose';
import { IBase } from '../../core/interfaces';
import { JobFieldName } from './job.enum';

export interface IJob extends Document, IBase {
    [JobFieldName.ID]: string;
    [JobFieldName.JOB_RANK]: string;
    [JobFieldName.JOB_TITLE]: string;
}
