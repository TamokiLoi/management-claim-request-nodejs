import { IsDate, IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CONTRACT_TYPES, JOB_RANKS, JOB_TITLES } from '../../../core/constants/common.constant';
import { BaseDto } from '../../../core/dtos';
import { BaseContractType, BaseJobRank, BaseJobName } from '../../../core/enums';
import { EmployeeFieldName } from '../employee.enum';

export default class CreateEmployeeDto extends BaseDto {
    @IsNotEmpty()
    @IsString()
    public [EmployeeFieldName.USER_ID]: string;

    @IsNotEmpty()
    @IsString()
    public [EmployeeFieldName.ACCOUNT]: string;

    @IsNotEmpty()
    @IsString()
    public [EmployeeFieldName.ADDRESS]: string;

    @IsNotEmpty()
    @IsString()
    public [EmployeeFieldName.PHONE]: string;

    @IsNotEmpty()
    @IsString()
    public [EmployeeFieldName.FULL_NAME]: string;

    @IsNotEmpty()
    @IsString()
    public [EmployeeFieldName.AVATAR_URL]: string;

    @IsNotEmpty()
    @IsString()
    public [EmployeeFieldName.DEPARTMENT_NAME]: string;

    @IsNotEmpty()
    @IsIn(JOB_RANKS)
    public [EmployeeFieldName.JOB_RANK]: BaseJobRank;

    @IsNotEmpty()
    @IsIn(JOB_TITLES)
    public [EmployeeFieldName.JOB_TITLE]: BaseJobName;

    @IsNotEmpty()
    @IsNumber()
    public [EmployeeFieldName.SALARY]: number;

    @IsNotEmpty()
    @IsIn(CONTRACT_TYPES)
    public [EmployeeFieldName.CONTRACT_TYPE]: BaseContractType;

    @IsNotEmpty()
    @IsDate()
    public [EmployeeFieldName.START_DATE]: Date;

    @IsDate()
    public [EmployeeFieldName.END_DATE]: Date;

    @IsString()
    public [EmployeeFieldName.UPDATED_BY]: string;

    constructor(
        user_id: string,
        account: string,
        address: string,
        phone: string,
        full_name: string,
        avatar_url: string,
        department_name: string,
        job_rank: BaseJobRank,
        job_title: BaseJobName,
        salary: number,
        contract_type: BaseContractType,
        start_date: Date,
        end_date: Date = new Date(),
        updated_by: string,

        created_at: Date = new Date(),
        updated_at: Date = new Date(),
        is_deleted: boolean = false,
    ) {
        super(created_at, updated_at, is_deleted);
        this.user_id = user_id;
        this.account = account;
        this.address = address;
        this.phone = phone;
        this.full_name = full_name;
        this.avatar_url = avatar_url;
        this.department_name = department_name;
        this.job_rank = job_rank;
        this.job_title = job_title;
        this.salary = salary;
        this.contract_type = contract_type;
        this.start_date = start_date;
        this.end_date = end_date;
        this.updated_by = updated_by;
    }
}
