import { IsBoolean, IsString } from 'class-validator';

export default class SearchRoleDto {
    @IsString()
    public role_code: string;

    @IsString()
    public role_name: string;

    @IsBoolean()
    public is_deleted: boolean;

    constructor(
        role_code: string = '',
        role_name: string = '',
        is_deleted: boolean = false,
    ) {
        this.role_code = role_code;
        this.role_name = role_name;
        this.is_deleted = is_deleted;
    }
}
