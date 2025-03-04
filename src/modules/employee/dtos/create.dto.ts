import { IsDate, IsIn, IsNumber, IsString } from 'class-validator';
import { JOB_RANKS } from '../../../core/constants/common.constant';
import { BaseDto } from '../../../core/dtos';
import { BaseJobRank } from '../../../core/enums';
import { EmployeeFieldName } from '../employee.enum';

export default class CreateEmployeeDto extends BaseDto {
    @IsString()
    public [EmployeeFieldName.USER_ID]: string;

    @IsIn(JOB_RANKS)
    public [EmployeeFieldName.JOB_RANK]: BaseJobRank | string;

    @IsString()
    public [EmployeeFieldName.ACCOUNT]: string;

    @IsString()
    public [EmployeeFieldName.ADDRESS]: string;

    @IsString()
    public [EmployeeFieldName.PHONE]: string;

    @IsString()
    public [EmployeeFieldName.FULL_NAME]: string;

    @IsString()
    public [EmployeeFieldName.AVATAR_URL]: string;

    @IsString()
    public [EmployeeFieldName.DEPARTMENT_CODE]: string;

    @IsNumber()
    public [EmployeeFieldName.SALARY]: number;

    @IsString()
    public [EmployeeFieldName.CONTRACT_TYPE]: string;

    @IsString()
    public [EmployeeFieldName.START_DATE]: Date | string;

    @IsString()
    public [EmployeeFieldName.END_DATE]: Date | string;

    public [EmployeeFieldName.UPDATED_BY]: string | null;

    constructor(
        user_id: string,
        job_rank: BaseJobRank | string = '',
        contract_type: string = '',
        account: string = '',
        address: string = '',
        phone: string = '',
        full_name: string = '',
        avatar_url: string = '',
        department_code: string = '',
        salary: number = 0,
        start_date: Date | string = new Date(),
        end_date: Date | string = new Date(),
        updated_by: string | null,

        created_at: Date = new Date(),
        updated_at: Date = new Date(),
        is_deleted: boolean = false,
    ) {
        super(created_at, updated_at, is_deleted);
        this.user_id = user_id;
        this.job_rank = job_rank;
        this.contract_type = contract_type;
        this.account = account;
        this.address = address;
        this.phone = phone;
        this.full_name = full_name;
        this.avatar_url = avatar_url;
        this.department_code = department_code;
        this.salary = salary;
        this.start_date = start_date;
        this.end_date = end_date;
        this.updated_by = updated_by;
    }
}
