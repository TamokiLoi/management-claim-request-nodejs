import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../../../core/dtos';
import { ProjectFieldName, ProjectStatusEnum } from '../project.enum';
import { IProjectMember } from '../project.interface';
import { ProjectStatusType } from '../project.type';

export default class CreateProjectDto extends BaseDto {
    @IsNotEmpty()
    @IsString()
    public [ProjectFieldName.PROJECT_NAME]: string;

    @IsNotEmpty()
    @IsString()
    public [ProjectFieldName.PROJECT_CODE]: string;

    @IsString()
    public [ProjectFieldName.PROJECT_DEPARTMENT]: string;

    public [ProjectFieldName.PROJECT_DESCRIPTION]: string;

    public [ProjectFieldName.PROJECT_MEMBERS]: IProjectMember[];

    public [ProjectFieldName.PROJECT_STATUS]: ProjectStatusType;

    @IsString()
    public [ProjectFieldName.PROJECT_START_DATE]: Date;

    @IsString()
    public [ProjectFieldName.PROJECT_END_DATE]: Date;

    public [ProjectFieldName.UPDATED_BY]: string | null;

    constructor(
        project_name: string,
        project_code: string,
        project_department: string,
        project_description: string,
        project_members: IProjectMember[],
        project_status: ProjectStatusType = ProjectStatusEnum.NEW,
        project_start_date: Date = new Date(),
        project_end_date: Date = new Date(),
        updated_by: string | null,

        created_at: Date = new Date(),
        updated_at: Date = new Date(),
        is_deleted: boolean = false,
    ) {
        super(created_at, updated_at, is_deleted);
        this.project_name = project_name;
        this.project_code = project_code;
        this.project_department = project_department;
        this.project_description = project_description;
        this.project_members = project_members;
        this.project_status = project_status;
        this.project_start_date = project_start_date;
        this.project_end_date = project_end_date;
        this.updated_by = updated_by;
    }
}
