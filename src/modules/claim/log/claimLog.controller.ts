import { BaseController } from '../../../core/controller';
import { IClaimLog } from './claimLog.interface';
import ClaimLogService from './claimLog.service';
import CreateClaimLogDto from './dto/create.dto';
import SearchPaginationClaimLogDto from './dto/searchPagination.dto';

export default class ClaimLogController extends BaseController<
    IClaimLog,
    CreateClaimLogDto,
    CreateClaimLogDto,
    SearchPaginationClaimLogDto
> {
    constructor() {
        super(new ClaimLogService());
    }
}
