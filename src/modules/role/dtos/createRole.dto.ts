import { IsNotEmpty } from 'class-validator';
import { BaseDto } from '../../../core/dtos';

export default class CreateRoleDto extends BaseDto {
    @IsNotEmpty()
    public role_code: string;

    @IsNotEmpty()
    public role_name: string;

    description: string;

    constructor(
        role_code: string,
        role_name: string,
        description: string = '',
        created_at: Date = new Date(),
        updated_at: Date = new Date(),
        is_deleted: boolean = false,
    ) {
        super(created_at, updated_at, is_deleted);
        this.role_code = role_code;
        this.role_name = role_name;
        this.description = description;
    }
}
