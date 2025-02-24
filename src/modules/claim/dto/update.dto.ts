import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../../../core/dtos';
import { ClaimFieldName } from '../claim.enum';
import { ClaimStatusType } from '../claim.type';
import { Type } from 'class-transformer';

export default class UpdateClaimDto extends BaseDto {
    public [ClaimFieldName.ID]: string;

    public [ClaimFieldName.USER_ID]: string | null;

    @IsNotEmpty()
    public [ClaimFieldName.PROJECT_ID]: string | null;

    @IsNotEmpty()
    public [ClaimFieldName.APPROVAL_ID]: string | null;

    @IsNotEmpty()
    public [ClaimFieldName.CLAIM_NAME]: string;

    public [ClaimFieldName.CLAIM_STATUS]: ClaimStatusType;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    public [ClaimFieldName.CLAIM_START_DATE]: Date;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    public [ClaimFieldName.CLAIM_END_DATE]: Date;

    public [ClaimFieldName.TOTAL_WORK_TIME]: number;

    public [ClaimFieldName.REMARKS]: string;

    constructor(
        _id: string,
        user_id: string | null,
        project_id: string | null,
        approval_id: string | null,
        claim_name: string,
        claim_status: ClaimStatusType,
        claim_start_date: Date,
        claim_end_date: Date,
        total_work_time: number,
        remarks: string,

        created_at: Date,
        updated_at: Date = new Date(),
        is_deleted: boolean = false,
    ) {
        super(created_at, updated_at, is_deleted);
        this._id = _id;
        this.user_id = user_id;
        this.project_id = project_id;
        this.approval_id = approval_id;
        this.claim_name = claim_name;
        this.claim_status = claim_status;
        this.claim_start_date = claim_start_date;
        this.claim_end_date = claim_end_date;
        this.total_work_time = total_work_time;
        this.remarks = remarks;
    }
}
