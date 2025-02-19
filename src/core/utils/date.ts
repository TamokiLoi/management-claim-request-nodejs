import { HttpStatus } from '../enums';
import { HttpException } from '../exceptions';

export const compareDate = (startDate: Date | string, endDate: Date | string) => {
    if (new Date(startDate) > new Date(endDate)) {
        throw new HttpException(
            HttpStatus.BadRequest,
            'Invalid date range, start date must be greater than or equal to end date',
        );
    }
};
