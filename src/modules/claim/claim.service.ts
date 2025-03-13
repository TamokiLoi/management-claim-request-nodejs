import { omit } from 'lodash';
import { BaseRoleCode, HttpStatus } from '../../core/enums';
import { HttpException } from '../../core/exceptions';
import { SearchPaginationResponseModel } from '../../core/models';
import { compareDate, formatSearchPaginationResponse } from '../../core/utils';
import { DataStoredInToken } from '../auth';
import { ProjectService } from '../project';
import { IUser, UserService } from '../user';
import { VALID_STATUS_CHANGE_PERMISSION_PAIRS } from './claim.constant';
import { ClaimStatusEnum } from './claim.enum';
import { IClaim } from './claim.interface';
import { ClaimRepository } from './claim.repository';
import CreateClaimDto from './dto/create.dto';
import SearchPaginationClaimDto from './dto/searchPagination.dto';
import UpdateClaimDto from './dto/update.dto';
import UpdateClaimStatusDto from './dto/updateStatus.dto';
import ClaimLogService from './log/claimLog.service';

export default class ClaimService {
    private claimRepository = new ClaimRepository();
    private projectService = new ProjectService();
    private userService = new UserService();
    private claimLogService = new ClaimLogService();

    public async create(data: CreateClaimDto, loggedUser: DataStoredInToken): Promise<IClaim> {
        await this.validClaimData(data, loggedUser);

        data.claim_status = ClaimStatusEnum.DRAFT;
        data.user_id = loggedUser.id;

        const isOverlapping = await this.claimRepository.findItemByRangeDate(data);

        if (isOverlapping) {
            throw new HttpException(HttpStatus.BadRequest, 'Claim date range conflicts with an existing claim!');
        }

        // create new item
        const newItem = await this.claimRepository.create(data);
        if (!newItem) {
            throw new HttpException(HttpStatus.Accepted, 'Create claim failed!');
        }
        return newItem;
    }

    public async getItems(dataSearch: SearchPaginationClaimDto): Promise<SearchPaginationResponseModel<IClaim>> {
        const { data, total } = await this.claimRepository.getItems(dataSearch);
        return formatSearchPaginationResponse(data, {
            ...dataSearch.pageInfo,
            totalItems: total,
            totalPages: 0,
        });
    }

    public async getItem(id: string): Promise<IClaim> {
        const item = await this.claimRepository.findById(id);
        if (!item) {
            throw new HttpException(HttpStatus.BadRequest, `Claim request info is not exists.`);
        }
        return item;
    }

    public async update(id: string, data: UpdateClaimDto, loggedUser: DataStoredInToken): Promise<IClaim> {
        // check item exists
        const item = await this.getItem(id);

        if (item.claim_status !== ClaimStatusEnum.DRAFT) {
            throw new HttpException(HttpStatus.BadRequest, 'Only claim with status is draft can be updated.');
        }

        // validate claim data
        await this.validClaimData(data, loggedUser);
        const filteredData = omit(data, ['claim_status', 'user_id']);

        const isOverlapping = await this.claimRepository.findItemByRangeDate(data);

        if (isOverlapping) {
            throw new HttpException(HttpStatus.BadRequest, 'Claim date range conflicts with an existing claim!');
        }

        // update item
        const updateItem = await this.claimRepository.update(id, filteredData);
        if (!updateItem) {
            throw new HttpException(HttpStatus.BadRequest, 'Update claim failed!');
        }
        return updateItem;
    }

    public async updateStatus(data: UpdateClaimStatusDto, loggedUser: DataStoredInToken): Promise<boolean> {
        const { claim_status, comment } = data;

        // check item exists
        const claimInfo = await this.getItem(data._id);

        // get user info
        const userInfo = await this.userService.getItem(loggedUser.id);

        await this.validClaimDataStatus(data, loggedUser, claimInfo, userInfo);

        // TODO: check logic paid to balance for user

        // create claim_log
        const createClaimLogItem = await this.claimLogService.create(
            {
                claim_id: claimInfo._id,
                user_id: loggedUser.id,
                old_status: claimInfo.claim_status,
                new_status: claim_status,
                comment,
                created_at: new Date(),
                updated_at: new Date(),
                is_deleted: false,
            },
            loggedUser,
        );
        if (!createClaimLogItem) {
            throw new HttpException(HttpStatus.Accepted, 'Create claim log failed!');
        }

        const updateStatusItem = await this.claimRepository.updateStatus(data);
        if (!updateStatusItem.acknowledged) {
            throw new HttpException(HttpStatus.BadRequest, 'Update status item failed!');
        }
        return true;
    }

    private async validClaimData(data: CreateClaimDto | UpdateClaimDto, loggedUser: DataStoredInToken) {
        const { project_id, approval_id, claim_start_date, claim_end_date } = data;
        if (claim_start_date && claim_end_date) {
            await compareDate(claim_start_date, claim_end_date);
        }

        // check project exists
        await this.projectService.getItem(project_id as string);

        // check approval exists
        const approvalExist = await this.userService.getItem(approval_id as string);

        // check approval_id is role approval
        if (approvalExist.role_code !== BaseRoleCode.A003) {
            throw new HttpException(
                HttpStatus.BadRequest,
                "You can only request approval from users who have the 'Approval' role.",
            );
        }

        // check approval not request for their own claim
        if (approval_id === loggedUser.id) {
            throw new HttpException(HttpStatus.BadRequest, 'You cannot request approval for your own claim.');
        }

        // check user in project
        const isUserExistInProject = await this.claimRepository.checkUserExistsInProject(
            loggedUser.id,
            project_id as string,
        );
        if (!isUserExistInProject) {
            throw new HttpException(HttpStatus.BadRequest, 'You can only select projects where you are a member!');
        }
    }

    private validClaimDataStatus(
        data: UpdateClaimStatusDto,
        loggedUser: DataStoredInToken,
        claimInfo: IClaim,
        userInfo: IUser,
    ) {
        const { claim_status, comment } = data;

        const old_status = claimInfo.claim_status;
        const new_status = claim_status;

        // check user can cancel claim
        if (
            [ClaimStatusEnum.CANCELED, ClaimStatusEnum.PENDING_APPROVAL].includes(new_status) &&
            claimInfo.user_id?.toString() !== loggedUser.id
        ) {
            throw new HttpException(HttpStatus.Forbidden, 'Only owner of the claim can cancel or submit approve it.');
        }

        // check user can approve, return, reject claim
        if (
            [ClaimStatusEnum.APPROVED, ClaimStatusEnum.REJECTED].includes(new_status) &&
            claimInfo.user_id?.toString() === loggedUser.id
        ) {
            throw new HttpException(
                HttpStatus.Forbidden,
                'Users with the Approval role cannot approve or reject their own claim status.',
            );
        }

        if (old_status === new_status) {
            throw new HttpException(HttpStatus.BadRequest, `This Claim has already with status is ${old_status}`);
        }

        const validPair = VALID_STATUS_CHANGE_PERMISSION_PAIRS.find(
            ([fromStatus, toStatus]) => fromStatus === old_status && toStatus === new_status,
        );

        if (!validPair) {
            throw new HttpException(
                HttpStatus.BadRequest,
                `Invalid status change. Current status: ${old_status} -> ${new_status}`,
            );
        }

        const allowedRoles = validPair[2];
        if (!allowedRoles.includes(userInfo.role_code)) {
            throw new Error(
                `User with Role "${userInfo.role_code}" is not authorized to change status from "${old_status}" to "${new_status}".`,
            );
        }

        // check status rejected
        if (new_status === ClaimStatusEnum.REJECTED && !comment) {
            throw new HttpException(HttpStatus.BadRequest, 'Please comment the reason for action rejected this claim!');
        }
    }
}
