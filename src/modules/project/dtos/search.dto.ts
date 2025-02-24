import { IsBoolean, IsDateString, IsIn, IsString } from 'class-validator';
import { ProjectFieldName } from '../project.enum';
import { ProjectStatusType } from '../project.type';
import { ProjectStatusList } from '../project.constant';

export default class SearchProjectDto {
    @IsString()
    public keyword: string;

    @IsIn(ProjectStatusList)
    public [ProjectFieldName.PROJECT_STATUS]: ProjectStatusType | string;

    @IsString()
    public [ProjectFieldName.PROJECT_START_DATE]: Date | string;

    @IsString()
    public [ProjectFieldName.PROJECT_END_DATE]: Date | string;

    public user_id: string;

    @IsBoolean()
    public is_deleted: boolean;

    constructor(
        keyword: string = '',
        project_status: ProjectStatusType | string = '',
        project_start_date: Date | string = '',
        project_end_date: Date | string = '',
        user_id: string = '',
        is_deleted: boolean = false,
    ) {
        this.keyword = keyword;
        this.project_status = project_status;
        this.project_start_date = project_start_date;
        this.project_end_date = project_end_date;
        this.user_id = user_id;
        this.is_deleted = is_deleted;
    }
}
