import { IsBoolean } from 'class-validator';

export default class SearchClaimLogDto {
    public claim_id: string;

    @IsBoolean()
    public is_deleted: boolean;

    constructor(claim_id: string = '', is_deleted: boolean = false) {
        this.claim_id = claim_id;
        this.is_deleted = is_deleted;
    }
}
