import { BaseRepository } from '../../core/repository';
import { IUser } from './user.interface';
import UserSchema from './user.model';

export class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(UserSchema);
    }
}
