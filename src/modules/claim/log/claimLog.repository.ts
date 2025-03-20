import mongoose from 'mongoose';
import { HttpStatus } from '../../../core/enums';
import { HttpException } from '../../../core/exceptions';
import { BaseRepository } from '../../../core/repository';
import { IClaimLog } from './claimLog.interface';
import ClaimLogSchema from './claimLog.model';
import SearchClaimLogDto from './dto/search.dto';
import SearchPaginationClaimLogDto from './dto/searchPagination.dto';

export class ClaimLogRepository extends BaseRepository<IClaimLog> {
    private claimLogSchema = ClaimLogSchema;

    constructor() {
        super(ClaimLogSchema);
    }

    public async getItems(model: SearchPaginationClaimLogDto): Promise<{ data: IClaimLog[]; total: number }> {
        const searchCondition = { ...new SearchClaimLogDto(), ...model.searchCondition };
        const { claim_id } = searchCondition;
        const { pageNum, pageSize } = model.pageInfo;

        let query = { claim_id: new mongoose.Types.ObjectId(claim_id) };
        try {
            // Fetch data with pagination
            const resultQuery = await this.claimLogSchema.aggregate([
                { $match: query },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user_info',
                    },
                },
                { $unwind: { path: '$user_info', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'claims',
                        localField: 'claim_id',
                        foreignField: '_id',
                        as: 'claim_info',
                    },
                },
                { $unwind: { path: '$claim_info', preserveNullAndEmptyArrays: true } },
                { $sort: { created_at: -1 }},
                { $skip: (pageNum - 1) * pageSize },
                { $limit: pageSize },
                {
                    $group: {
                        _id: '$_id',
                        claim_name: { $first: '$claim_info.claim_name' },
                        updated_by: { $first: '$user_info.user_name' },
                        updated_by_user_id: { $first: '$user_info._id' },
                        old_status: { $first: '$old_status' },
                        new_status: { $first: '$new_status' },
                        is_deleted: { $first: '$is_deleted' },
                        created_at: { $first: '$created_at' },
                        updated_at: { $first: '$updated_at' },
                    },
                },
            ]);

            // Count total records
            const rowCount = await this.claimLogSchema.countDocuments(query);

            return {
                data: resultQuery,
                total: rowCount,
            };
        } catch (error) {
            throw new HttpException(HttpStatus.BadRequest, 'Database query failed');
        }
    }
}
