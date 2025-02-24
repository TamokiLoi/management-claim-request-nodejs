import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../core/controller';
import { HttpStatus } from '../../core/enums';
import { formatResponse } from '../../core/utils';
import { IClaim } from './claim.interface';
import ClaimService from './claim.service';
import CreateClaimDto from './dto/create.dto';
import SearchPaginationClaimDto from './dto/searchPagination.dto';
import UpdateClaimStatusDto from './dto/updateStatus.dto';
import { SearchPaginationResponseModel } from '../../core/models';
import { ClaimStatusEnum } from './claim.enum';

export default class ClaimController extends BaseController<
    IClaim,
    CreateClaimDto,
    CreateClaimDto,
    SearchPaginationClaimDto
> {
    private claimService: ClaimService;

    constructor() {
        const service = new ClaimService();
        super(service);
        this.claimService = service;
    }

    public updateStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: UpdateClaimStatusDto = req.body;
            await this.claimService.updateStatus(model, req.user);
            res.status(HttpStatus.Success).json(formatResponse<null>(null));
        } catch (error) {
            next(error);
        }
    };

    public getItemsForClaimer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: SearchPaginationClaimDto = req.body;
            model.searchCondition.user_id = req.user.id;
            const result = await this.claimService.getItems(model);
            res.status(HttpStatus.Success).json(formatResponse<SearchPaginationResponseModel<IClaim>>(result));
        } catch (error) {
            next(error);
        }
    };

    public getItemsForApproval = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: SearchPaginationClaimDto = req.body;
            model.searchCondition.approval_id = req.user.id;
            const result = await this.claimService.getItems(model);
            res.status(HttpStatus.Success).json(formatResponse<SearchPaginationResponseModel<IClaim>>(result));
        } catch (error) {
            next(error);
        }
    };

    public getItemsForFinance = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: SearchPaginationClaimDto = req.body;
            model.searchCondition.claim_status = ClaimStatusEnum.PAID;
            const result = await this.claimService.getItems(model);
            res.status(HttpStatus.Success).json(formatResponse<SearchPaginationResponseModel<IClaim>>(result));
        } catch (error) {
            next(error);
        }
    };
}
