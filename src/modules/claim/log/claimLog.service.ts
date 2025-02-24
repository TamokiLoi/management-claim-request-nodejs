import { HttpStatus } from '../../../core/enums';
import { HttpException } from '../../../core/exceptions';
import { SearchPaginationResponseModel } from '../../../core/models';
import { formatSearchPaginationResponse } from '../../../core/utils';
import { DataStoredInToken } from '../../auth';
import { IClaimLog } from './claimLog.interface';
import { ClaimLogRepository } from './claimLog.repository';
import CreateClaimLogDto from './dto/create.dto';
import SearchPaginationClaimLogDto from './dto/searchPagination.dto';

export default class ClaimLogService {
    private claimLogRepository = new ClaimLogRepository();

    public async create(model: CreateClaimLogDto, loggedUser: DataStoredInToken): Promise<IClaimLog> {
        model.user_id = loggedUser.id;
        const newItem = await this.claimLogRepository.create(model);
        if (!newItem) {
            throw new HttpException(HttpStatus.BadRequest, 'Create claim log failed!');
        }
        return newItem;
    }

    public async getItems(
        model: SearchPaginationClaimLogDto,
    ): Promise<SearchPaginationResponseModel<IClaimLog>> {
        const { claim_id } = model.searchCondition;

        if (!claim_id) {
            throw new HttpException(HttpStatus.BadRequest, 'Claim ID is required');
        }

        const { data, total } = await this.claimLogRepository.getItems(model);
        return formatSearchPaginationResponse(data, {
            ...model.pageInfo,
            totalItems: total,
            totalPages: 0,
        });
    }
}
