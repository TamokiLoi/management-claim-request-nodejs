import { HttpStatus } from '../../core/enums';
import { HttpException } from '../../core/exceptions';
import { normalizeParam } from '../../core/models';
import { IContract } from './contract.interface';
import ContractSchema from './contract.model';

export default class ContractService {
    public contractSchema = ContractSchema;

    public async getAllItems(keyword: string): Promise<IContract[]> {
        let query = {};
        const keywordValue = normalizeParam(keyword)?.trim();
        if (keywordValue) {
            query = {
                $or: [
                    { contract_type: { $regex: keywordValue, $options: 'i' } },
                    { description: { $regex: keywordValue, $options: 'i' } },
                ],
            };
        }

        query = {
            ...query,
            is_deleted: false,
        };
        const result = await this.contractSchema.find(query).sort({ updated_at: -1 }).exec();

        return result || [];
    }

    public async getItemByContractType(contract_type: string): Promise<IContract> {
        const item = await this.contractSchema.findOne({ contract_type, is_deleted: false }).lean();
        if (!item) {
            throw new HttpException(HttpStatus.BadRequest, `Contract is not exists.`);
        }
        return item;
    }
}
