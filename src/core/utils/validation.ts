import { FilterQuery, Model } from 'mongoose';
import { HttpStatus } from '../enums';
import { HttpException } from '../exceptions';
import { IError } from '../interfaces';

export const checkUserMatch = (userId: string, userInItem: string, title: string) => {
    if (userId !== userInItem) {
        throw new HttpException(HttpStatus.BadRequest, `You cannot update or delete another user's ${title}!`);
    }
};

export const checkValidUrl = (url: string) => {
    const urlPattern = /^(http:\/\/|https:\/\/)/i;
    return urlPattern.test(url);
};

export async function checkFieldsExists<T>(
    schema: Model<T>,
    fields: { fieldName: string; fieldValue: string }[],
    errorResults: IError[],
    title: string,
): Promise<IError[]> {
    for (const { fieldName, fieldValue } of fields) {
        const fieldValid = await checkFieldExists(schema, fieldName, fieldValue);
        if (fieldValid) {
            errorResults.push({
                message: `${title} with ${fieldName.replace('_', ' ')} '${fieldValue}' already exists!`,
                field: fieldName,
            });
        }
    }
    return errorResults;
}

export async function checkFieldExists<T>(schema: Model<T>, fieldName: string, fieldValue: string): Promise<T | null> {
    const escapedValue = fieldValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const query = {
        [fieldName]: { $regex: new RegExp('^' + escapedValue + '$', 'i') },
    } as FilterQuery<T>;

    try {
        const result = await schema.findOne(query);
        return result;
    } catch (error) {
        throw new HttpException(HttpStatus.BadRequest, 'Database query failed');
    }
}
