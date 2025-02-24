export const API_PATH = {
    // swagger api-docs
    API_DOCS: '/api-docs',

    // migrate
    MIGRATE: '/api/migrate',
    MIGRATE_ROLES: '/api/migrate/roles',
    MIGRATE_DEPARTMENTS: '/api/migrate/departments',
    MIGRATE_JOBS: '/api/migrate/jobs',
    MIGRATE_USER_ADMIN: '/api/migrate/user-admin',
    MIGRATE_CONTRACTS: '/api/migrate/contracts',

    // auth
    AUTH: '/api/auth',
    AUTH_LOGOUT: '/api/auth/logout',
    AUTH_VERIFY_TOKEN: '/api/auth/verify-token',
    AUTH_RESEND_TOKEN: '/api/auth/resend-token',
    AUTH_FORGOT_PASSWORD: '/api/auth/forgot-password',
    AUTH_TRIGGER_VERIFY_TOKEN: '/api/auth/trigger-verify-token',

    // role
    ROLES: '/api/roles',
    SEARCH_ROLES: '/api/roles/search',
    GET_ALL_ROLES: '/api/roles/get-all',

    // job
    JOBS: '/api/jobs',
    GET_ALL_JOBS: '/api/jobs/get-all',

    // department
    DEPARTMENT: '/api/departments',
    GET_ALL_DEPARTMENT: '/api/departments/get-all',

    // contract
    CONTRACTS: '/api/contracts',
    GET_ALL_CONTRACTS: '/api/contracts/get-all',

    // user
    USERS: '/api/users',
    SEARCH_USERS: '/api/users/search',
    CHANGE_PASSWORD: '/api/users/change-password',
    CHANGE_STATUS_USERS: '/api/users/change-status',
    CHANGE_ROLE_USER: '/api/users/change-role',

    // employees
    EMPLOYEES: '/api/employees',

    // projects
    PROJECTS: '/api/projects',
    PROJECTS_SEARCH: '/api/projects/search',
    PROJECTS_CHANGE_STATUS: '/api/projects/change-status',

    // claims
    CLAIMS: '/api/claims',
    CLAIMS_SEARCH: '/api/claims/search',
    CLAIMS_CLAIMER_SEARCH: '/api/claims/claimer-search',
    CLAIMS_APPROVAL_SEARCH: '/api/claims/approval-search',
    CLAIMS_FINANCE_SEARCH: '/api/claims/finance-search',
    CLAIMS_CHANGE_STATUS: '/api/claims/change-status',

    // claim_logs
    CLAIM_LOGS: '/api/claim-logs',
    CLAIM_LOGS_SEARCH: '/api/claim-logs/search',
};
