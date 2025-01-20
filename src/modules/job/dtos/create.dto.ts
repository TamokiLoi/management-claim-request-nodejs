import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../../../core/dtos';

export default class CreateJobDto extends BaseDto {
    @IsNotEmpty()
    @IsString()
    public job_rank: string;

    @IsNotEmpty()
    @IsString()
    public job_title: string

    constructor(
        job_rank: string,
        job_title: string,

        created_at: Date = new Date(),
        updated_at: Date = new Date(),
        is_deleted: boolean = false,
    ) {
        super(created_at, updated_at, is_deleted);
        this.job_rank = job_rank;
        this.job_title = job_title;
    }
}
