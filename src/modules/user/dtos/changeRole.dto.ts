import { IsNotEmpty, IsString } from "class-validator";

export default class ChangeRoleDto {
    @IsNotEmpty()
    @IsString()
    public user_id: string;

    @IsNotEmpty()
    @IsString()
    public role_code: string;

    constructor(user_id: string, role_code: string) {
        this.user_id = user_id;
        this.role_code = role_code;
    }
}
