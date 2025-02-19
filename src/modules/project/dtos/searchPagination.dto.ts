import { Type } from 'class-transformer';
import { SearchPaginationRequestModel } from '../../../core/models';
import { PaginationRequestModel } from '../../../core/models/pagination.model';
import SearchProjectDto from './search.dto';

export default class SearchPaginationProjectDto extends SearchPaginationRequestModel<SearchProjectDto> {
    constructor(pageInfo: PaginationRequestModel, searchCondition: SearchProjectDto) {
        super(pageInfo, searchCondition);
    }

    @Type(() => SearchProjectDto)
    public searchCondition!: SearchProjectDto;
}
