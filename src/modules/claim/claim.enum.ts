export enum ClaimFieldName {
    ID = '_id',
    CLAIM_ID = 'claim_id',
    USER_ID = 'user_id',
    PROJECT_ID = 'project_id',
    APPROVAL_ID = 'approval_id',
    CLAIM_NAME = 'claim_name',
    CLAIM_STATUS = 'claim_status',
    CLAIM_START_DATE = 'claim_start_date',
    CLAIM_END_DATE = 'claim_end_date',
    TOTAL_WORK_TIME = 'total_work_time',
    REMARKS = 'remarks',
    COMMENT = 'comment'
}

export enum ClaimStatusEnum {
    DRAFT = 'Draft',
    PENDING_APPROVAL = 'Pending Approval',
    APPROVED = 'Approved',
    PAID = 'Paid',
    REJECTED = 'Rejected',
    CANCELED = 'Canceled',
}
