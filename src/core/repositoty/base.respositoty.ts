import { Document, FilterQuery, Model, UpdateWriteOpResult } from 'mongoose';
import { IError } from '../interfaces';

export class BaseRepository<T extends Document> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    public async create(data: Partial<T>): Promise<T> {
        const newItem = new this.model(data);
        return (await newItem.save()) as T;
    }

    public async findById(id: string): Promise<T | null> {
        return this.model.findOne({ _id: id, is_deleted: false });
    }

    public async findAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    public async update(id: string, data: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // delete flag logic
    public async delete(id: string): Promise<UpdateWriteOpResult> {
        return this.model.updateOne({ _id: id }, { is_deleted: true, updated_at: new Date() });
    }

    // check fields duplicate
    public async checkFieldsExists<T>(
        fields: { fieldName: string; fieldValue: string }[],
        errorResults: IError[],
        title: string,
    ): Promise<IError[]> {
        for (const { fieldName, fieldValue } of fields) {
            const fieldValid = await this.checkFieldExists(fieldName, fieldValue);
            if (fieldValid) {
                errorResults.push({
                    message: `${title} with ${fieldName.replace('_', ' ')} '${fieldValue}' already exists!`,
                    field: fieldName,
                });
            }
        }
        return errorResults;
    }

    // check field duplicate
    public async checkFieldExists<T>(fieldName: string, fieldValue: string): Promise<T | null> {
        const escapedValue = fieldValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const query = {
            [fieldName]: { $regex: new RegExp('^' + escapedValue + '$', 'i') },
        } as FilterQuery<T>;

        return await this.model.findOne(query);
    }
}
