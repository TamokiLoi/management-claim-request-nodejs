import { Document } from 'mongoose';
import { IBase } from '../../core/interfaces';
import { EmployeeFieldName } from './employee.enum';

export interface IEmployee extends Document, IBase {
    [EmployeeFieldName.ID]: string;
    [EmployeeFieldName.USER_ID]: string | null;
    [EmployeeFieldName.JOB_RANK]: string;
    [EmployeeFieldName.JOB_TITLE]: string;
    [EmployeeFieldName.ACCOUNT]: string;
    [EmployeeFieldName.ADDRESS]: string;
    [EmployeeFieldName.PHONE]: string;
    [EmployeeFieldName.FULL_NAME]: string;
    [EmployeeFieldName.AVATAR_URL]: string;
    [EmployeeFieldName.DEPARTMENT_NAME]: string;
    [EmployeeFieldName.SALARY]: number;
    [EmployeeFieldName.CONTRACT_TYPE]: string;
    [EmployeeFieldName.START_DATE]: Date;
    [EmployeeFieldName.END_DATE]: Date;
    [EmployeeFieldName.UPDATED_BY]: string | null;
}
