export const API_PATH = {
    // swagger api-docs
    API_DOCS: '/api-docs',

    // migrate
    MIGRATE: '/api/migrate',
    MIGRATE_ROLES: '/api/migrate/roles',
    MIGRATE_JOBS: '/api/migrate/jobs',
    MIGRATE_USER_ADMIN: '/api/migrate/user-admin',

    // auth
    AUTH: '/api/auth',
    AUTH_LOGOUT: '/api/auth/logout',
    AUTH_VERIFY_TOKEN: '/api/auth/verify-token',
    AUTH_RESEND_TOKEN: '/api/auth/resend-token',
    AUTH_FORGOT_PASSWORD: '/api/auth/forgot-password',

    // role
    ROLES: '/api/roles',
    SEARCH_ROLES: '/api/roles/search',
    GET_ALL_ROLES: '/api/roles/get-all',

    // job
    JOBS: '/api/jobs',
    GET_ALL_JOBS: '/api/jobs/get-all',

    // user
    USERS: '/api/users',
    SEARCH_USERS: '/api/users/search',
    CHANGE_PASSWORD: '/api/users/change-password',
    CHANGE_STATUS_USERS: '/api/users/change-status',
    CHANGE_ROLE_USER: '/api/users/change-role',
};
