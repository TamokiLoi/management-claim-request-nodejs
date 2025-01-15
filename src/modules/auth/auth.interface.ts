import { BaseRoleCode } from "../../core/enums";

export interface TokenData {
    token: string;
}

export interface DataStoredInToken {
    id: string;
    role_code: BaseRoleCode | string;
    version: number;
}