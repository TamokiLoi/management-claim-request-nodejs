import { Type } from 'class-transformer';
import { SearchPaginationRequestModel } from '../../../core/models';
import { PaginationRequestModel } from '../../../core/models/pagination.model';
import SearchClaimDto from './search.dto';

export default class SearchPaginationClaimDto extends SearchPaginationRequestModel<SearchClaimDto> {
    constructor(pageInfo: PaginationRequestModel, searchCondition: SearchClaimDto) {
        super(pageInfo, searchCondition);
    }

    @Type(() => SearchClaimDto)
    public searchCondition!: SearchClaimDto;
}
