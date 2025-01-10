import { HttpStatus } from '../../core/enums';
import { HttpException } from '../../core/exceptions';
import { checkValidUrl, encodePassword, isEmptyObject } from '../../core/utils';
import CreateUserDto from './dtos/createUser.dto';
import { IUser } from './user.interface';
import UserSchema from './user.model';

export default class UserService {
    public userSchema = UserSchema;

    public async createUser(model: CreateUserDto): Promise<IUser> {
        if (isEmptyObject(model)) {
            throw new HttpException(HttpStatus.BadRequest, 'Model data is empty');
        }

        let newUser = {
            ...model,
            role: '1', // TODO: change when have model Role
            phone: model.phone || '',
            full_name: model.full_name || '',
            avatar_url: model.avatar_url || '',
        };

        if (newUser.avatar_url && !checkValidUrl(model.avatar_url)) {
            throw new HttpException(HttpStatus.BadRequest, `The URL: '${model.avatar_url}' is not valid`);
        }

        // check email duplicates
        const existingUserByEmail = await this.userSchema.findOne({
            email: { $regex: new RegExp('^' + newUser.email + '$', 'i') },
            is_deleted: false,
        });
        if (existingUserByEmail) {
            throw new HttpException(HttpStatus.BadRequest, `Your email: '${newUser.email}' already exists!`);
        }

        // handle encode password
        newUser.password = await encodePassword(model.password);

        // create user in database and return result
        const createdUser: IUser = await this.userSchema.create(newUser);
        if (!createdUser) {
            throw new HttpException(HttpStatus.Accepted, `Create User failed!`);
        }
        const resultUser: IUser = createdUser.toObject();
        delete resultUser.password;
        return resultUser;
    }

    public async getUser(userId: string): Promise<IUser> {
        const user = await this.userSchema.findOne({ _id: userId, is_deleted: false }).lean();
        if (!user) {
            throw new HttpException(HttpStatus.BadRequest, `User is not exists.`);
        }
        return user;
    }
}
