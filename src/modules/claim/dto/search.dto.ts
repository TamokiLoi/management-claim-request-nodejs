import { IsBoolean, IsIn, IsString } from 'class-validator';
import { ClaimStatusList } from '../claim.constant';
import { ClaimFieldName } from '../claim.enum';
import { ClaimStatusType } from '../claim.type';

export default class SearchClaimDto {
    @IsString()
    public keyword: string; // claim_name, project_name

    @IsIn(ClaimStatusList)
    public [ClaimFieldName.CLAIM_STATUS]: ClaimStatusType | string;

    @IsString()
    public [ClaimFieldName.CLAIM_START_DATE]: Date | string;

    @IsString()
    public [ClaimFieldName.CLAIM_END_DATE]: Date | string;

    public [ClaimFieldName.USER_ID]: string;
    public [ClaimFieldName.APPROVAL_ID]: string;

    @IsBoolean()
    public is_deleted: boolean;

    constructor(
        keyword: string = '',
        claim_status: ClaimStatusType | string = '',
        claim_start_date: Date | string = '',
        claim_end_date: Date | string = '',
        user_id: string = '',
        approval_id: string = '',
        is_deleted: boolean = false,
    ) {
        this.keyword = keyword;
        this.claim_status = claim_status;
        this.claim_start_date = claim_start_date;
        this.claim_end_date = claim_end_date;
        this.user_id = user_id;
        this.approval_id = approval_id;
        this.is_deleted = is_deleted;
    }
}
