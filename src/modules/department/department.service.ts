import { IDepartment, IDepartmentService } from './department.interface';
import { DepartmentRepository } from './department.repository';

export default class DepartmentService implements IDepartmentService {
    private departmentRepository = new DepartmentRepository();

    public async findItemsWithKeyword(keyword: string): Promise<IDepartment[]> {
        return await this.departmentRepository.findItemsWithKeyword(keyword, ['department_code', 'department_name']);
    }
}
