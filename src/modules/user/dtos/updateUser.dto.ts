import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class UpdateUserDto {
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public user_name: string;

    constructor(
        email: string,
        user_name: string,
    ) {
        this.email = email;
        this.user_name = user_name;
    }
}
