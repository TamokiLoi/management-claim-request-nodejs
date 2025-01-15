import bcryptjs from 'bcryptjs';
import { BaseRoleCode, HttpStatus } from '../../core/enums';
import { HttpException } from '../../core/exceptions';
import { SearchPaginationResponseModel } from '../../core/models';
import {
    createTokenVerifiedUser,
    encodePassword,
    encodePasswordUserNormal,
    isEmptyObject,
    sendMail,
} from '../../core/utils';
import { DataStoredInToken } from '../auth';
import ChangePasswordDto from './dtos/changePassword.dto';
import CreateUserDto from './dtos/createUser.dto';
import SearchPaginationUserDto from './dtos/searchPaginationUser.dto';
import SearchUserDto from './dtos/searchUser.dto';
import { IUser } from './user.interface';
import UserSchema from './user.model';

export default class UserService {
    public userSchema = UserSchema;

    public async createUser(model: CreateUserDto): Promise<IUser> {
        if (isEmptyObject(model)) {
            throw new HttpException(HttpStatus.BadRequest, 'Model data is empty');
        }

        let newUser = model;

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

        // send mail for newUser with token
        if (!newUser.is_verified) {
            let subject: string = 'Verify your email address';
            let content: string = `Hello, ${newUser.user_name}.`;

            // create token verification and assign token to newUser
            const tokenData = createTokenVerifiedUser();
            newUser.verification_token = tokenData.verification_token;
            newUser.verification_token_expires = tokenData.verification_token_expires;
            const domain = process.env.DOMAIN_FE;
            content = `${content}\nPlease click the following link to verify your email address:\n${domain}/verify-email/${tokenData.verification_token}`;

            const sendMailResult = await sendMail({
                toMail: newUser.email,
                subject: subject,
                content: content,
            });

            if (!sendMailResult) {
                throw new HttpException(HttpStatus.BadRequest, `Cannot send mail for ${newUser.email}`);
            }
        }

        // create user in database and return result
        const createdUser: IUser = await this.userSchema.create(newUser);
        if (!createdUser) {
            throw new HttpException(HttpStatus.Accepted, `Create User failed!`);
        }
        const resultUser: IUser = createdUser.toObject();
        delete resultUser.password;
        return resultUser;
    }

    public async getUsers(model: SearchPaginationUserDto): Promise<SearchPaginationResponseModel<IUser>> {
        const searchCondition = { ...new SearchUserDto(), ...model.searchCondition };
        const { keyword, role_code, is_blocked, is_deleted, is_verified } = searchCondition;
        const { pageNum, pageSize } = model.pageInfo;

        let query = {};
        if (keyword) {
            const keywordValue = keyword.toLowerCase().trim();
            query = {
                $or: [
                    { email: { $regex: keywordValue, $options: 'i' } },
                    { user_name: { $regex: keywordValue, $options: 'i' } },
                ],
            };
        }

        if (role_code) {
            const role_codeValue = role_code.toLowerCase().trim();
            query = {
                ...query,
                role_code: { $regex: role_codeValue, $options: 'i' },
            };
        }

        if (is_verified !== '') {
            query = {
                ...query,
                is_verified,
            };
        }

        query = {
            ...query,
            is_blocked,
            is_deleted,
        };

        const resultQuery = await this.userSchema
            .find(query)
            .sort({ updated_at: -1 })
            .select('-password')
            .skip((pageNum - 1) * pageSize)
            .limit(pageSize)
            .exec();

        const rowCount = await this.userSchema.find(query).countDocuments().exec();
        const result = new SearchPaginationResponseModel<IUser>();
        result.pageInfo.pageNum = pageNum;
        result.pageInfo.pageSize = pageSize;
        if (rowCount > 0) {
            result.pageData = resultQuery;
            result.pageInfo.totalItems = rowCount;
            result.pageInfo.totalPages = Math.ceil(rowCount / pageSize);
        }

        return result;
    }

    public async getUser(userId: string, is_deletedPassword = true): Promise<IUser> {
        const user = await this.userSchema.findOne({ _id: userId, is_deleted: false }).lean();
        if (!user) {
            throw new HttpException(HttpStatus.BadRequest, `User is not exists.`);
        }
        if (is_deletedPassword) {
            delete user.password;
        }
        return user;
    }

    public async changePassword(model: ChangePasswordDto, loggedUser: DataStoredInToken): Promise<boolean> {
        if (isEmptyObject(model)) {
            throw new HttpException(HttpStatus.BadRequest, 'Model data is empty');
        }

        const userId = model.user_id || loggedUser.id;

        // check updateUser exits
        const updateUser = await this.getUser(userId, false);

        // check if user change password for other users must be role admin
        if (loggedUser.id !== userId && loggedUser.role_code !== BaseRoleCode.A001) {
            throw new HttpException(HttpStatus.BadRequest, "You are not authorized to change another user's password.");
        }

        // check old_password match
        if (model.old_password) {
            const isMatchPassword = await bcryptjs.compare(model.old_password, updateUser.password!);
            if (!isMatchPassword) {
                throw new HttpException(HttpStatus.BadRequest, `Your old password is not valid!`);
            }
        }

        // compare new_password vs old_password
        if (model.new_password === model.old_password) {
            throw new HttpException(HttpStatus.BadRequest, `New password and old password must not be the same!`);
        }

        // handle encode password
        const newPassword = await encodePasswordUserNormal(model.new_password);
        const updatePasswordUser = await this.userSchema
            .findByIdAndUpdate(userId, {
                ...updateUser,
                password: newPassword,
                updated_at: new Date(),
            })
            .lean();

        if (!updatePasswordUser) throw new HttpException(HttpStatus.BadRequest, 'Change password failed!');

        return true;
    }
}
