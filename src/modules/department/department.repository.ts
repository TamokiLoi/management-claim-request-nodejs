
import { BaseRepository } from '../../core/repository';
import { IDepartment } from './department.interface';
import DepartmentSchema from './department.model';

export class DepartmentRepository extends BaseRepository<IDepartment> {
    constructor() {
        super(DepartmentSchema);
    }
}
