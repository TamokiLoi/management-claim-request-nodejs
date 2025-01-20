import { IJob } from './job.interface';
import JobSchema from './job.model';

export default class JobService {
    public jobSchema = JobSchema;

    public async getAllItems(keyword: string): Promise<IJob[]> {
        let query = {};
        if (keyword) {
            const keywordValue = keyword.toLowerCase().trim();
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
}
