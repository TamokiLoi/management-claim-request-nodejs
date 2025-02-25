import mongoose, { UpdateWriteOpResult } from 'mongoose';
import { HttpStatus } from '../../core/enums';
import { HttpException } from '../../core/exceptions';
import { BaseRepository } from '../../core/repository';
import { formatItemsQuery } from '../../core/utils';
import SearchProjectDto from './dtos/search.dto';
import SearchPaginationProjectDto from './dtos/searchPagination.dto';
import UpdateProjectStatusDto from './dtos/updateStatus.dto';
import { IProject } from './project.interface';
import ProjectSchema from './project.model';

export class ProjectRepository extends BaseRepository<IProject> {
    private projectSchema = ProjectSchema;

    constructor() {
        super(ProjectSchema);
    }

    public async getItems(model: SearchPaginationProjectDto): Promise<{ data: IProject[]; total: number }> {
        const searchCondition = { ...new SearchProjectDto(), ...model.searchCondition };
        const { keyword, project_status, project_start_date, project_end_date, user_id, is_deleted } = searchCondition;
        const { pageNum, pageSize } = model.pageInfo;

        let listQuery: Record<string, any> = {};
        if (keyword) {
            const keywordValue = keyword.trim();
            listQuery = {
                $or: [
                    { project_code: { $regex: keywordValue, $options: 'i' } },
                    { project_name: { $regex: keywordValue, $options: 'i' } },
                    { project_department: { $regex: keywordValue, $options: 'i' } },
                ],
            };
        }

        listQuery = {
            ...listQuery,
            ...(project_start_date && { project_start_date: { $gte: project_start_date } }),
            ...(project_end_date && { project_end_date: { $lte: project_end_date } }),
        };

        listQuery = formatItemsQuery(listQuery, { project_status, is_deleted });

        if (user_id) {
            listQuery['project_members.user_id'] = new mongoose.Types.ObjectId(user_id);
        }

        try {
            // Fetch data with pagination
            const resultQuery = await this.projectSchema.aggregate([
                ...this.getProjectAggregationPipeline(listQuery),
                { $sort: { updated_at: -1 } },
                { $skip: (pageNum - 1) * pageSize },
                { $limit: pageSize },
            ]);

            // Count total records
            const rowCount = await this.projectSchema.countDocuments(listQuery);

            return {
                data: resultQuery,
                total: rowCount,
            };
        } catch (error) {
            throw new HttpException(HttpStatus.BadRequest, 'Database query failed');
        }
    }

    // get item with project member full info
    public async getItemDetail(id: string): Promise<IProject[]> {
        const detailQuery = { _id: new mongoose.Types.ObjectId(id), is_deleted: false };
        return this.projectSchema.aggregate(this.getProjectAggregationPipeline(detailQuery));
    }

    public async updateStatus(model: UpdateProjectStatusDto): Promise<UpdateWriteOpResult> {
        const { _id, project_status, project_comment, updated_by } = model;
        return this.projectSchema.updateOne(
            { _id },
            {
                project_status,
                project_comment,
                updated_by,
                updated_at: new Date(),
            },
        );
    }

    // get full information about project with: userInfo, employeeInfo
    private getProjectAggregationPipeline = (query: Record<string, any>) => {
        return [
            { $match: query },
            { $unwind: { path: '$project_members', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'project_members.user_id',
                    foreignField: '_id',
                    as: 'user_info',
                },
            },
            { $unwind: { path: '$user_info', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'employees',
                    localField: 'project_members.user_id',
                    foreignField: 'user_id',
                    as: 'employee_info',
                },
            },
            { $unwind: { path: '$employee_info', preserveNullAndEmptyArrays: true } },
            {
                $group: {
                    _id: '$_id',
                    project_name: { $first: '$project_name' },
                    project_code: { $first: '$project_code' },
                    project_department: { $first: '$project_department' },
                    project_description: { $first: '$project_description' },
                    project_status: { $first: '$project_status' },
                    project_start_date: { $first: '$project_start_date' },
                    project_end_date: { $first: '$project_end_date' },
                    updated_by: { $first: '$updated_by' },
                    is_deleted: { $first: '$is_deleted' },
                    created_at: { $first: '$created_at' },
                    updated_at: { $first: '$updated_at' },
                    project_comment: { $first: '$project_comment' },
                    project_members: {
                        $push: {
                            project_role: '$project_members.project_role',
                            user_id: '$project_members.user_id',
                            employee_id: '$employee_info._id',
                            user_name: '$user_info.user_name',
                            full_name: '$employee_info.full_name',
                        },
                    },
                },
            },
        ];
    };
}
