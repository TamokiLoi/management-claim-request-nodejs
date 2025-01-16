import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export default class ChangeStatusDto {
    @IsNotEmpty()
    @IsString()
    public user_id: string;

    @IsNotEmpty()
    @IsBoolean()
    public is_blocked: boolean;

    constructor(user_id: string, is_blocked: boolean) {
        this.user_id = user_id;
        this.is_blocked = is_blocked;
    }
}
