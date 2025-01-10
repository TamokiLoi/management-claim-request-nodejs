import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { BaseDto } from '../../../core/dtos';

export default class CreateUserDto extends BaseDto {
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @MinLength(6)
    public password: string;

    @IsNotEmpty()
    public user_name: string;

    public phone: string;
    public avatar_url: string;
    public full_name: string;

    @IsNotEmpty()
    @IsString()
    public role_code: string;

    constructor(
        email: string,
        password: string,
        user_name: string,
        phone: string = '',
        avatar_url: string = '',
        full_name: string = '',
        role_code: string,
        created_at: Date = new Date(),
        updated_at: Date = new Date(),
        is_deleted: boolean = false,
    ) {
        super(created_at, updated_at, is_deleted);
        this.email = email;
        this.password = password;
        this.user_name = user_name;
        this.phone = phone;
        this.avatar_url = avatar_url;
        this.full_name = full_name;
        this.role_code = role_code;
    }
}
