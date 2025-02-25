import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../core/controller';
import { HttpStatus } from '../../core/enums';
import { formatResponse } from '../../core/utils';
import CreateProjectDto from './dtos/create.dto';
import SearchPaginationProjectDto from './dtos/searchPagination.dto';
import UpdateProjectStatusDto from './dtos/updateStatus.dto';
import { IProject } from './project.interface';
import ProjectService from './project.service';
import { ProjectJobData } from './project.constant';
import { ProjectRoleListType } from './project.type';

export default class ProjectController extends BaseController<
    IProject,
    CreateProjectDto,
    CreateProjectDto,
    SearchPaginationProjectDto
> {
    private projectService: ProjectService;

    constructor() {
        const service = new ProjectService();
        super(service);
        this.projectService = service;
    }

    public updateStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: UpdateProjectStatusDto = req.body;
            await this.projectService.updateStatus(model, req.user);
            res.status(HttpStatus.Success).json(formatResponse<null>(null));
        } catch (error) {
            next(error);
        }
    };

    public getRolesInProject = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(HttpStatus.Success).json(formatResponse<ProjectRoleListType[]>(ProjectJobData));
        } catch (error) {
            next(error);
        }
    };
}
