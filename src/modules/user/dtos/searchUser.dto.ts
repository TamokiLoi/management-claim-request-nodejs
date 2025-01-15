import { IsBoolean, IsString } from 'class-validator';

export default class SearchUserDto {
    @IsString()
    public keyword: string;

    @IsString()
    public role_code: string;

    @IsBoolean()
    public is_blocked: boolean;

    @IsBoolean()
    public is_deleted: boolean;

    public is_verified: boolean | string;

    constructor(
        keyword: string = '',
        role_code: string = '',
        is_blocked: boolean = false,
        is_deleted: boolean = false,
        is_verified: boolean | string = '',
    ) {
        this.keyword = keyword;
        this.role_code = role_code;
        this.is_blocked = is_blocked;
        this.is_deleted = is_deleted;
        this.is_verified = is_verified;
    }
}
