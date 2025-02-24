import { IsNotEmpty } from 'class-validator';
import { BaseDto } from '../../../../core/dtos';
import { ClaimStatusType } from '../../claim.type';
import { ClaimLogFieldName } from '../claimLog.enum';

export default class CreateClaimLogDto extends BaseDto {
    @IsNotEmpty()
    public [ClaimLogFieldName.CLAIM_ID]: string | null;

    public [ClaimLogFieldName.USER_ID]: string | null;

    @IsNotEmpty()
    public [ClaimLogFieldName.OLD_STATUS]: ClaimStatusType;

    @IsNotEmpty()
    public [ClaimLogFieldName.NEW_STATUS]: ClaimStatusType;

    public [ClaimLogFieldName.COMMENT]: string;

    constructor(
        claim_id: string | null,
        user_id: string | null = '',
        old_status: ClaimStatusType,
        new_status: ClaimStatusType,
        comment: string,

        created_at: Date = new Date(),
        updated_at: Date = new Date(),
        is_deleted: boolean = false,
    ) {
        super(created_at, updated_at, is_deleted);
        this.claim_id = claim_id;
        this.user_id = user_id;
        this.old_status = old_status;
        this.new_status = new_status;
        this.comment = comment;
    }
}
