import { Type } from 'class-transformer';
import { SearchPaginationRequestModel } from '../../../../core/models';
import { PaginationRequestModel } from '../../../../core/models/pagination.model';
import SearchClaimLogDto from './search.dto';

export default class SearchPaginationClaimLogDto extends SearchPaginationRequestModel<SearchClaimLogDto> {
    constructor(pageInfo: PaginationRequestModel, searchCondition: SearchClaimLogDto) {
        super(pageInfo, searchCondition);
    }

    @Type(() => SearchClaimLogDto)
    public searchCondition!: SearchClaimLogDto;
}
