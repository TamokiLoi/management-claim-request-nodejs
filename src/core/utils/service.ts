import { SearchPaginationResponseModel } from '../models';
import { PaginationResponseModel } from '../models/pagination.model';

export const formatSearchPaginationResponse = <T>(
    data: T[],
    paginationInfo: PaginationResponseModel,
): SearchPaginationResponseModel<T> => {
    const result = new SearchPaginationResponseModel<T>();
    const { totalItems, pageSize, pageNum } = paginationInfo;
    result.pageInfo.pageNum = pageNum;
    result.pageInfo.pageSize = pageSize;

    if (totalItems > 0) {
        result.pageData = data;
        result.pageInfo.totalItems = totalItems;
        result.pageInfo.totalPages = Math.ceil(totalItems / pageSize);
    }

    return result;
};
