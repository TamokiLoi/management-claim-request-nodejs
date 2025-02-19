import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../core/enums';
import { SearchPaginationResponseModel } from '../../core/models';
import { formatResponse } from '../../core/utils';
import CreateProjectDto from './dtos/create.dto';
import SearchPaginationProjectDto from './dtos/searchPagination.dto';
import UpdateProjectStatusDto from './dtos/updateStatus.dto';
import { IProject } from './project.interface';
import ProjectService from './project.service';

export default class ProjectController {
    private projectService = new ProjectService();

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: CreateProjectDto = req.body;
            const item: IProject = await this.projectService.create(model, req.user);
            res.status(HttpStatus.Created).json(formatResponse<IProject>(item));
        } catch (error) {
            next(error);
        }
    };

    public getItems = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: SearchPaginationProjectDto = req.body;
            const result: SearchPaginationResponseModel<IProject> = await this.projectService.getItems(model);
            res.status(HttpStatus.Success).json(formatResponse<SearchPaginationResponseModel<IProject>>(result));
        } catch (error) {
            next(error);
        }
    };

    public getDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const item: IProject = await this.projectService.getItem(req.params.id);
            res.status(HttpStatus.Success).json(formatResponse<IProject>(item));
        } catch (error) {
            next(error);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: CreateProjectDto = req.body;
            const item: IProject = await this.projectService.update(req.params.id, model, req.user);
            res.status(HttpStatus.Success).json(formatResponse<IProject>(item));
        } catch (error) {
            next(error);
        }
    };

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.projectService.delete(req.params.id);
            res.status(HttpStatus.Success).json(formatResponse<null>(null));
        } catch (error) {
            next(error);
        }
    };

    public updateStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: UpdateProjectStatusDto = req.body;
            await this.projectService.updateStatus(model, req.user);
            res.status(HttpStatus.Success).json(formatResponse<null>(null));
        } catch (error) {
            next(error);
        }
    };
}
