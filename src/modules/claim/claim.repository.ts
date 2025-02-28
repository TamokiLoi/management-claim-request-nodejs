import mongoose, { UpdateWriteOpResult } from 'mongoose';
import { HttpStatus } from '../../core/enums';
import { HttpException } from '../../core/exceptions';
import { BaseRepository } from '../../core/repository';
import { formatItemsQuery } from '../../core/utils';
import { IClaim } from './claim.interface';
import ClaimSchema from './claim.model';
import SearchClaimDto from './dto/search.dto';
import SearchPaginationClaimDto from './dto/searchPagination.dto';
import UpdateClaimStatusDto from './dto/updateStatus.dto';
import CreateClaimDto from './dto/create.dto';
import UpdateClaimDto from './dto/update.dto';
import { ClaimFieldName, ClaimStatusEnum } from './claim.enum';

export class ClaimRepository extends BaseRepository<IClaim> {
    private claimSchema = ClaimSchema;

    constructor() {
        super(ClaimSchema);
    }

    public async getItems(model: SearchPaginationClaimDto): Promise<{ data: IClaim[]; total: number }> {
        const searchCondition = { ...new SearchClaimDto(), ...model.searchCondition };
        const { keyword, claim_status, claim_start_date, claim_end_date, user_id, approval_id, is_deleted } =
            searchCondition;
        const { pageNum, pageSize } = model.pageInfo;

        let listQuery: Partial<Record<string, unknown>> = {};
        if (keyword) {
            const keywordValue = keyword.trim();
            listQuery = {
                $or: [{ claim_name: { $regex: keywordValue, $options: 'i' } }],
            };
        }

        listQuery = {
            ...listQuery,
            ...(claim_start_date && { claim_start_date: { $gte: claim_start_date } }),
            ...(claim_end_date && { claim_end_date: { $lte: claim_end_date } }),
        };

        listQuery = formatItemsQuery(listQuery, { claim_status, is_deleted });

        if (user_id) {
            listQuery['user_id'] = new mongoose.Types.ObjectId(user_id);
        }

        if (approval_id) {
            listQuery['approval_id'] = new mongoose.Types.ObjectId(approval_id);
        }

        try {
            // Fetch data with pagination
            const resultQuery = await this.claimSchema.aggregate([
                { $match: listQuery },
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
                        from: 'employees',
                        localField: 'user_info._id',
                        foreignField: 'user_id',
                        as: 'employee_info',
                    },
                },
                { $unwind: { path: '$employee_info', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'approval_id',
                        foreignField: '_id',
                        as: 'approval_info',
                    },
                },
                { $unwind: { path: '$approval_info', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'projects',
                        localField: 'project_id',
                        foreignField: '_id',
                        as: 'project_info',
                    },
                },
                { $unwind: { path: '$project_info', preserveNullAndEmptyArrays: true } },
                { $sort: { created_at: -1 }},
                { $skip: (pageNum - 1) * pageSize },
                { $limit: pageSize },
                {
                    $addFields: {
                        role_in_project: {
                            $arrayElemAt: [
                                {
                                    $filter: {
                                        input: '$project_info.project_members',
                                        as: 'member',
                                        cond: { $eq: ['$$member.user_id', '$user_id'] },
                                    },
                                },
                                0,
                            ],
                        },
                    },
                },
                {
                    $project: {
                        'approval_info.password': 0,
                        'user_info.password': 0,
                        'employee_info.password': 0,
                    },
                },
                {
                    $group: {
                        _id: '$_id',
                        staff_id: { $first: '$user_id' },
                        staff_name: { $first: '$user_info.user_name' },
                        staff_email: { $first: '$user_info.email' },
                        staff_role: { $first: '$user_info.role' },
                        employee_info: { $first: '$employee_info' },
                        approval_info: { $first: '$approval_info' },
                        project_info: { $first: '$project_info' },
                        role_in_project: { $first: '$role_in_project.project_role' },
                        claim_name: { $first: '$claim_name' },
                        claim_start_date: { $first: '$claim_start_date' },
                        claim_end_date: { $first: '$claim_end_date' },
                        claim_status: { $first: '$claim_status' },
                        is_deleted: { $first: '$is_deleted' },
                        created_at: { $first: '$created_at' },
                        updated_at: { $first: '$updated_at' },
                    },
                },
            ]);

            // Count total records
            const rowCount = await this.claimSchema.countDocuments(listQuery);

            return {
                data: resultQuery,
                total: rowCount,
            };
        } catch (error) {
            throw new HttpException(HttpStatus.BadRequest, 'Database query failed');
        }
    }

    public async updateStatus(model: UpdateClaimStatusDto): Promise<UpdateWriteOpResult> {
        const { _id, claim_status } = model;
        return this.claimSchema.updateOne(
            { _id },
            {
                claim_status,
                updated_at: new Date(),
            },
        );
    }

    public async findItemByRangeDate(data: CreateClaimDto | UpdateClaimDto): Promise<IClaim | null> {
        const { user_id, claim_start_date, claim_end_date } = data;

        const claimStartDate = new Date(claim_start_date);
        const claimEndDate = new Date(claim_end_date);

        const query: Partial<Record<string, unknown>> = {
            [ClaimFieldName.USER_ID]: user_id,
            [ClaimFieldName.CLAIM_STATUS]: { $ne: ClaimStatusEnum.CANCELED },
            [ClaimFieldName.CLAIM_START_DATE]: { $lt: claimEndDate },
            [ClaimFieldName.CLAIM_END_DATE]: { $gt: claimStartDate },
        };

        if ('_id' in data && data._id) {
            query._id = { $ne: data._id };
        }

        return this.claimSchema.findOne(query);
    }
}
