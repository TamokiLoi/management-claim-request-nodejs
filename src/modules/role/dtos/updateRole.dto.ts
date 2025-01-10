import { IsNotEmpty } from 'class-validator';

export default class UpdateRoleDto {
    @IsNotEmpty()
    public role_code: string;

    @IsNotEmpty()
    public role_name: string;

    description: string;

    constructor(role_code: string, role_name: string, description: string = '') {
        this.role_code = role_code;
        this.role_name = role_name;
        this.description = description;
    }
}
