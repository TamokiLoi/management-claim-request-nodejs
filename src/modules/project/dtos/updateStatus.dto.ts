import { IsIn, IsNotEmpty } from 'class-validator';
import { BaseDto } from '../../../core/dtos';
import { ProjectFieldName } from '../project.enum';
import { ProjectStatusType } from '../project.type';
import { ProjectStatusList } from '../project.constant';

export default class UpdateProjectStatusDto extends BaseDto {
    @IsNotEmpty()
    public [ProjectFieldName.PROJECT_ID]: string;

    @IsIn(ProjectStatusList)
    public [ProjectFieldName.PROJECT_STATUS]: ProjectStatusType;

    public [ProjectFieldName.PROJECT_COMMENT]: string;

    public [ProjectFieldName.UPDATED_BY]: string | null;

    constructor(
        project_id: string,
        project_status: ProjectStatusType,
        project_comment: string,
        updated_by: string | null,

        created_at: Date = new Date(),
        updated_at: Date = new Date(),
        is_deleted: boolean = false,
    ) {
        super(created_at, updated_at, is_deleted);
        this.project_id = project_id;
        this.project_status = project_status;
        this.project_comment = project_comment;
        this.updated_by = updated_by;
    }
}
