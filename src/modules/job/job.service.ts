import { HttpStatus } from '../../core/enums';
import { HttpException } from '../../core/exceptions';
import { normalizeParam } from '../../core/models';
import { IJob } from './job.interface';
import JobSchema from './job.model';

export default class JobService {
    public jobSchema = JobSchema;

    public async getAllItems(keyword: string): Promise<IJob[]> {
        let query = {};
        const keywordValue = normalizeParam(keyword)?.trim();
        if (keywordValue) {
            query = {
                $or: [
                    { job_rank: { $regex: keywordValue, $options: 'i' } },
                    { job_title: { $regex: keywordValue, $options: 'i' } },
                ],
            };
        }

        query = {
            ...query,
            is_deleted: false,
        };
        const result = await this.jobSchema.find(query).sort({ updated_at: -1 }).exec();

        return result || [];
    }

    public async getItemByJobRank(job_rank: string): Promise<IJob> {
        const item = await this.jobSchema.findOne({ job_rank, is_deleted: false }).lean();
        if (!item) {
            throw new HttpException(HttpStatus.BadRequest, `JobRank is not exists.`);
        }
        return item;
    }
}
