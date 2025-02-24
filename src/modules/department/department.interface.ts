import { Document } from 'mongoose';
import { IBase, IBaseService } from '../../core/interfaces';
import { DepartmentFieldName } from './department.enum';

export interface IDepartment extends Document, IBase {
    [DepartmentFieldName.ID]: string;
    [DepartmentFieldName.DEPARTMENT_CODE]: string;
    [DepartmentFieldName.DEPARTMENT_NAME]: string;
    [DepartmentFieldName.DESCRIPTION]?: string;
}

export interface IDepartmentService extends Partial<IBaseService<IDepartment, never, never, never>> {
    findItemsWithKeyword(keyword: string): Promise<IDepartment[]>;
}
