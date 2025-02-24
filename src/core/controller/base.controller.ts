import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../enums';
import { IBaseService } from '../interfaces';
import { SearchPaginationResponseModel } from '../models';
import { formatResponse } from '../utils';
import { HttpException } from '../exceptions';

export default class BaseController<T, C, U, S> {
    protected service: Partial<IBaseService<T, C, U, S>>;

    constructor(service: Partial<IBaseService<T, C, U, S>>) {
        this.service = service;
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!this.service.create) {
                throw new HttpException(HttpStatus.BadRequest, 'Method create not implemented in the service');
            }

            const model: C = req.body;
            const item: T = await this.service.create(model, req.user);
            res.status(HttpStatus.Created).json(formatResponse<T>(item));
        } catch (error) {
            next(error);
        }
    };

    public getItems = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!this.service.getItems) {
                throw new HttpException(HttpStatus.BadRequest, 'Method getItems not implemented in the service');
            }

            const model: S = req.body;
            const result = await this.service.getItems(model);
            res.status(HttpStatus.Success).json(formatResponse<SearchPaginationResponseModel<T>>(result));
        } catch (error) {
            next(error);
        }
    };

    public getItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!this.service.getItem) {
                throw new HttpException(HttpStatus.BadRequest, 'Method getItem not implemented in the service');
            }

            const item: T = await this.service.getItem(req.params.id);
            res.status(HttpStatus.Success).json(formatResponse<T>(item));
        } catch (error) {
            next(error);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!this.service.update) {
                throw new HttpException(HttpStatus.BadRequest, 'Method update not implemented in the service');
            }

            const model: U = req.body;
            const item: T = await this.service.update(req.params.id, model, req.user);
            res.status(HttpStatus.Success).json(formatResponse<T>(item));
        } catch (error) {
            next(error);
        }
    };

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!this.service.delete) {
                throw new HttpException(HttpStatus.BadRequest, 'Method delete not implemented in the service');
            }

            await this.service.delete(req.params.id);
            res.status(HttpStatus.Success).json(formatResponse<null>(null));
        } catch (error) {
            next(error);
        }
    };

    public findItemsWithKeyword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!this.service.findItemsWithKeyword) {
                throw new HttpException(
                    HttpStatus.BadRequest,
                    'Method findItemsWithKeyword not implemented in the service',
                );
            }

            const { keyword } = req.query;
            const result: T[] = await this.service.findItemsWithKeyword(keyword as string);
            res.status(HttpStatus.Success).json(formatResponse<T[]>(result));
        } catch (error) {
            next(error);
        }
    };
}
