import { BaseRepository } from '../../core/repository';
import { IEmployee } from './employee.interface';
import EmployeeSchema from './employee.model';

export class EmployeeRepository extends BaseRepository<IEmployee> {
    constructor() {
        super(EmployeeSchema);
    }
}
