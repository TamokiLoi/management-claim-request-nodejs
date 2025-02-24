import { IsNotEmpty } from 'class-validator';
import { BaseDto } from '../../../core/dtos';
import { ClaimFieldName } from '../claim.enum';
import { ClaimStatusType } from '../claim.type';

export default class UpdateClaimStatusDto extends BaseDto {
    @IsNotEmpty()
    public [ClaimFieldName.ID]: string;

    @IsNotEmpty()
    public [ClaimFieldName.CLAIM_STATUS]: ClaimStatusType;

    public [ClaimFieldName.COMMENT]: string;

    constructor(
        _id: string,
        claim_status: ClaimStatusType,
        comment: string,

        created_at: Date = new Date(),
        updated_at: Date = new Date(),
        is_deleted: boolean = false,
    ) {
        super(created_at, updated_at, is_deleted);
        this._id = _id;
        this.claim_status = claim_status;
        this.comment = comment;
    }
}
