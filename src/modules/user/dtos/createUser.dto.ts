import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
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

    @IsNotEmpty()
    public role_code: string;

    public is_verified: boolean;
    public verification_token: string;
    public verification_token_expires: Date;
    public token_version: number;
    public is_blocked: boolean;

    constructor(
        email: string,
        password: string,
        user_name: string,
        role_code: string,

        is_verified: boolean = false,
        verification_token: string = '',
        verification_token_expires: Date = new Date(),
        token_version: number = 0,

        is_blocked: boolean = false,

        created_at: Date = new Date(),
        updated_at: Date = new Date(),
        is_deleted: boolean = false,
    ) {
        super(created_at, updated_at, is_deleted);
        this.email = email;
        this.password = password;
        this.user_name = user_name;
        this.role_code = role_code;
        this.is_verified = is_verified;
        this.verification_token = verification_token;
        this.verification_token_expires = verification_token_expires;
        this.token_version = token_version;
        this.is_blocked = is_blocked;
    }
}
