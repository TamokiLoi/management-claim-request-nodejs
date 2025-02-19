import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../core/enums';
import { formatResponse } from '../../core/utils';
import { IJob } from './job.interface';
import JobService from './job.service';

export default class JobController {
    private jobService = new JobService();

    public getAllItems = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { keyword } = req.query;
            const result: IJob[] = await this.jobService.getAllItems(keyword as string);
            res.status(HttpStatus.Success).json(formatResponse<IJob[]>(result));
        } catch (error) {
            next(error);
        }
    };
}
