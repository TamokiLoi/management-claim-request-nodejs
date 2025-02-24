import { BaseController } from '../../core/controller';
import { IDepartment } from './department.interface';
import DepartmentService from './department.service';

export default class DepartmentController extends BaseController<IDepartment, never, never, never> {
    constructor() {
        super(new DepartmentService());
    }
}
