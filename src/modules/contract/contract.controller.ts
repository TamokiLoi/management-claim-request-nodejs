import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../core/enums';
import { formatResponse } from '../../core/utils';
import { IContract } from './contract.interface';
import ContractService from './contract.service';

export default class ContractController {
    private contractService = new ContractService();

    public getAllItems = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { keyword } = req.query;
            const result: IContract[] = await this.contractService.getAllItems(keyword as string);
            res.status(HttpStatus.Success).json(formatResponse<IContract[]>(result));
        } catch (error) {
            next(error);
        }
    };
}
