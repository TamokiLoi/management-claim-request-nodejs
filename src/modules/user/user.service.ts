import bcryptjs from 'bcryptjs';
import { HttpStatus } from '../../core/enums';
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
import { RoleSchema } from '../role';
import ChangePasswordDto from './dtos/changePassword.dto';
import ChangeRoleDto from './dtos/changeRole.dto';
import ChangeStatusDto from './dtos/changeStatus.dto';
import CreateUserDto from './dtos/createUser.dto';
import SearchPaginationUserDto from './dtos/searchPaginationUser.dto';
import SearchUserDto from './dtos/searchUser.dto';
import UpdateUserDto from './dtos/updateUser.dto';
import { IUser } from './user.interface';
import UserSchema from './user.model';

export default class UserService {
    public userSchema = UserSchema;
    private roleSchema = RoleSchema;

    public async createUser(model: CreateUserDto): Promise<IUser> {
        if (isEmptyObject(model)) {
            throw new HttpException(HttpStatus.BadRequest, 'Model data is empty');
        }

        let newUser = model;

        // check email duplicates
        await this.checkEmailDuplicate(newUser.email);

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

        const userId = loggedUser.id;

        // check updateUser exits
        const updateUser = await this.getUser(userId, false);

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

    public async changeStatus(model: ChangeStatusDto): Promise<boolean> {
        if (isEmptyObject(model)) {
            throw new HttpException(HttpStatus.BadRequest, 'Model data is empty');
        }

        const userId = model.user_id;

        // check user exits
        const user = await this.getUser(userId);

        // check change status
        if (user.is_blocked === model.is_blocked) {
            throw new HttpException(HttpStatus.BadRequest, `User status is already ${model.is_blocked}`);
        }

        const updateUserId = await this.userSchema.updateOne(
            { _id: userId },
            { is_blocked: model.is_blocked, updated_at: new Date() },
        );

        if (!updateUserId.acknowledged) {
            throw new HttpException(HttpStatus.BadRequest, 'Update user status failed!');
        }

        return true;
    }

    public async changeRole(model: ChangeRoleDto): Promise<boolean> {
        if (isEmptyObject(model)) {
            throw new HttpException(HttpStatus.BadRequest, 'Model data is empty');
        }

        const userId = model.user_id;

        // check user exits
        const userExists = await this.getUser(userId);

        // check role_code exists in role
        const roleExists = await this.roleSchema.findOne({ role_code: model.role_code, is_deleted: false }).lean();
        if (!roleExists) {
            throw new HttpException(HttpStatus.BadRequest, `Role code ${model.role_code} is not exists or is deleted!`);
        }

        // check change role
        if (userExists.role_code === model.role_code) {
            throw new HttpException(HttpStatus.BadRequest, `User role is already ${roleExists.role_name}`);
        }

        const updateUserId = await this.userSchema.updateOne(
            { _id: userId },
            { role_code: model.role_code, updated_at: new Date() },
        );

        if (!updateUserId.acknowledged) {
            throw new HttpException(HttpStatus.BadRequest, 'Update user status failed!');
        }

        return true;
    }

    public async updateUser(userId: string, model: UpdateUserDto): Promise<IUser> {
        if (isEmptyObject(model)) {
            throw new HttpException(HttpStatus.BadRequest, 'Model data is empty');
        }

        // check user exits
        const userExists = await this.getUser(userId);

        if (userExists.email.toLowerCase().trim() !== model.email.toLowerCase().trim()) {
            // check email duplicates
            await this.checkEmailDuplicate(model.email);
        }

        const updateData = {
            email: model.email,
            user_name: model.user_name,
            updated_at: new Date(),
        };

        const updateUserId = await this.userSchema.updateOne({ _id: userId }, updateData);

        if (!updateUserId.acknowledged) {
            throw new HttpException(HttpStatus.BadRequest, 'Update user info failed!');
        }

        const updateUser = await this.getUser(userId);
        return updateUser;
    }

    public async deleteUser(userId: string): Promise<boolean> {
        const user = await this.getUser(userId);
        if (!user) {
            throw new HttpException(HttpStatus.BadRequest, `Item is not exists.`);
        }

        const updateUserId = await this.userSchema.updateOne(
            { _id: userId },
            { is_deleted: true, updated_at: new Date() },
        );

        if (!updateUserId.acknowledged) {
            throw new HttpException(HttpStatus.BadRequest, 'Delete item failed!');
        }

        return true;
    }

    private checkEmailDuplicate = async (email: string) => {
        // check email duplicates
        const existingUserByEmail = await this.userSchema.findOne({
            email: { $regex: new RegExp('^' + email + '$', 'i') },
            is_deleted: false,
        });
        if (existingUserByEmail) {
            throw new HttpException(HttpStatus.BadRequest, `Your email: '${email}' already exists!`);
        }
    };
}
