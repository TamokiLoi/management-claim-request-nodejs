import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../core/enums';
import { formatResponse } from '../../core/utils';
import CreateEmployeeDto from './dtos/create.dto';
import { IEmployee } from './employee.interface';
import EmployeeService from './employee.service';

export default class EmployeeController {
    private employeeService = new EmployeeService();

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: CreateEmployeeDto = req.body;
            const item: IEmployee = await this.employeeService.create(model, req.user);
            res.status(HttpStatus.Created).json(formatResponse<IEmployee>(item));
        } catch (error) {
            next(error);
        }
    };

    public getDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const item: IEmployee = await this.employeeService.getItem(req.params.id);
            res.status(HttpStatus.Success).json(formatResponse<IEmployee>(item));
        } catch (error) {
            next(error);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: CreateEmployeeDto = req.body;
            const item: IEmployee = await this.employeeService.update(req.params.id, model, req.user);
            res.status(HttpStatus.Success).json(formatResponse<IEmployee>(item));
        } catch (error) {
            next(error);
        }
    };
}
