import { HttpStatus } from '../../core/enums';
import { HttpException } from '../../core/exceptions';
import { IError } from '../../core/interfaces';
import { checkEmptyObject } from '../../core/utils';
import { DataStoredInToken } from '../auth';
import { ContractService } from '../contract';
import { JobService } from '../job';
import { UserService } from '../user';
import CreateEmployeeDto from './dtos/create.dto';
import { IEmployee } from './employee.interface';
import EmployeeSchema from './employee.model';
import { EmployeeRepository } from './employee.repository';

export default class EmployeeService {
    public employeeSchema = EmployeeSchema;
    private userService = new UserService();
    private jobService = new JobService();
    private contractService = new ContractService();
    private employeeRepository: EmployeeRepository;

    constructor() {
        this.employeeRepository = new EmployeeRepository();
    }

    public async create(model: CreateEmployeeDto, loggedUser: DataStoredInToken): Promise<IEmployee> {
        // Check user exists
        await this.userService.getItem(model.user_id);

        model.updated_by = loggedUser.id || 'admin';

        // create employee
        const createdItem: IEmployee = await this.employeeSchema.create(model);
        if (!createdItem) {
            throw new HttpException(HttpStatus.Accepted, `Create employee failed!`);
        }
        return createdItem;
    }

    public async getItem(id: string): Promise<IEmployee> {
        const item = await this.employeeSchema.findOne({ _id: id, is_deleted: false }).lean();
        if (!item) {
            throw new HttpException(HttpStatus.BadRequest, `Employee info is not exists.`);
        }
        return item;
    }

    public async update(id: string, model: CreateEmployeeDto, loggedUser: DataStoredInToken): Promise<IEmployee> {
        // check item exists
        await this.getItem(id);

        await checkEmptyObject(model);

        const { user_id, job_rank, contract_type } = model;

        // Check user exists
        await this.userService.getItem(user_id);

        // Check job_rank exists
        await this.jobService.getItemByJobRank(job_rank);

        // Check contract exists
        await this.contractService.getItemByContractType(contract_type);

        let errorResults: IError[] = [];

        // check validation data in model
        errorResults = await this.validateEmployeeData(model, errorResults);

        // check all fields valid
        if (errorResults.length) {
            throw new HttpException(HttpStatus.BadRequest, '', errorResults);
        }

        const updateData = {
            ...model,
            updated_by: loggedUser.id,
            updated_at: new Date(),
        };

        const updatedItem = await this.employeeSchema.updateOne({ _id: id }, updateData);

        if (!updatedItem.acknowledged) {
            throw new HttpException(HttpStatus.BadRequest, 'Update employee info failed!');
        }

        return this.getItem(id);
    }

    private async validateEmployeeData(model: CreateEmployeeDto, errorResults: IError[]): Promise<IError[]> {
        const { phone, salary } = model;

        // check phone valid
        errorResults = await this.employeeRepository.checkFieldsExists(
            [{ fieldName: 'phone', fieldValue: model.phone }],
            errorResults,
            'Employee',
        );

        // Check salary range
        if (salary < 3000000) {
            errorResults.push({
                message: 'Salary must be more than 3,000,000!',
                field: 'salary',
            });
        }

        return errorResults;
    }
}
