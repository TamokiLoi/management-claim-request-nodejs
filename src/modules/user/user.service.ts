import bcryptjs from 'bcryptjs';
import { HttpStatus } from '../../core/enums';
import { HttpException } from '../../core/exceptions';
import { IError } from '../../core/interfaces';
import { SearchPaginationResponseModel } from '../../core/models';
import {
    checkEmptyObject,
    createTokenVerifiedUser,
    encodePassword,
    encodePasswordUserNormal,
    sendMail,
} from '../../core/utils';
import { DataStoredInToken } from '../auth';
import { CreateEmployeeDto, EmployeeSchema } from '../employee';
import { RoleService } from '../role';
import ChangePasswordDto from './dtos/changePassword.dto';
import ChangeRoleDto from './dtos/changeRole.dto';
import ChangeStatusDto from './dtos/changeStatus.dto';
import CreateUserDto from './dtos/createUser.dto';
import SearchPaginationUserDto from './dtos/searchPaginationUser.dto';
import SearchUserDto from './dtos/searchUser.dto';
import UpdateUserDto from './dtos/updateUser.dto';
import { IUser } from './user.interface';
import UserSchema from './user.model';
import { UserRepository } from './user.repository';

export default class UserService {
    public userSchema = UserSchema;
    public employeeSchema = EmployeeSchema;
    private roleService = new RoleService();
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async create(model: CreateUserDto, loggedUser: DataStoredInToken): Promise<IUser> {
        await checkEmptyObject(model);

        let newUser = model;
        const { role_code } = newUser;

        // check role_code exists
        await this.roleService.getItemByRoleCode(role_code);

        // check email duplicates
        await this.checkEmailDuplicate(newUser.email);

        let errorResults: IError[] = [];

        // check user_name exists
        errorResults = await this.userRepository.checkFieldsExists(
            [{ fieldName: 'user_name', fieldValue: model.user_name }],
            errorResults,
            'User',
        );

        // check all fields valid
        if (errorResults.length) {
            throw new HttpException(HttpStatus.BadRequest, '', errorResults);
        }

        // handle encode password
        newUser.password = await encodePassword(model.password);

        // create session
        const session = await this.userSchema.startSession();
        session.startTransaction();

        try {
            // create token verification and assign token to newUser
            const tokenData = createTokenVerifiedUser();
            newUser.verification_token = tokenData.verification_token;
            newUser.verification_token_expires = tokenData.verification_token_expires;

            // create user in transaction
            const createdUser = await this.userSchema.create([newUser], { session });
            if (!createdUser || createdUser.length === 0) {
                throw new HttpException(HttpStatus.Accepted, `Create User failed!`);
            }

            const resultUser: IUser = createdUser[0].toObject();

            // create employee DTO and user info
            const newEmployee = new CreateEmployeeDto(
                resultUser._id,
                '',
                '',
                resultUser.user_name,
                '',
                '',
                '',
                '',
                '',
                0,
                '',
                '',
                '',
                new Date(),
                new Date(),
            );
            newEmployee.start_date = new Date();
            newEmployee.updated_by = loggedUser?.id || null;

            // create employee in transaction
            const employee = new this.employeeSchema(newEmployee);
            await employee.save({ session });

            // send mail for newUser with token
            if (!newUser.is_verified) {
                let subject: string = 'Verify your email address';
                let content: string = `Hello, ${newUser.user_name}.`;

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

            // commit transaction
            await session.commitTransaction();
            session.endSession();

            delete resultUser.password;
            return resultUser;
        } catch (error) {
            // if have error, rollback transaction
            await session.abortTransaction();
            session.endSession();

            throw new HttpException(HttpStatus.InternalServerError, `${error}`);
        }
    }

    public async getItems(model: SearchPaginationUserDto): Promise<SearchPaginationResponseModel<IUser>> {
        const searchCondition = { ...new SearchUserDto(), ...model.searchCondition };
        const { keyword, role_code, is_blocked, is_deleted, is_verified } = searchCondition;
        const { pageNum, pageSize } = model.pageInfo;

        let query = {};
        if (keyword) {
            const keywordValue = keyword.trim();
            query = {
                $or: [
                    { email: { $regex: keywordValue, $options: 'i' } },
                    { user_name: { $regex: keywordValue, $options: 'i' } },
                ],
            };
        }

        if (role_code) {
            const role_codeValue = role_code.trim();
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

    public async getItem(userId: string, is_deletedPassword = true): Promise<IUser> {
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
        await checkEmptyObject(model);

        const userId = loggedUser.id;

        // check updateUser exits
        const updateUser = await this.getItem(userId, false);

        if (updateUser.email === 'admin@gmail.com') {
            throw new HttpException(HttpStatus.BadRequest, 'Cannot change password for admin account default.');
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

    public async changeStatus(model: ChangeStatusDto): Promise<boolean> {
        await checkEmptyObject(model);

        const userId = model.user_id;

        // check user exits
        const user = await this.getItem(userId);

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
        await checkEmptyObject(model);

        const { user_id, role_code } = model;

        // check user exits
        const userExists = await this.getItem(user_id);

        // check role_code exists
        const roleExists = await this.roleService.getItemByRoleCode(role_code);

        // check change role
        if (userExists.role_code === role_code) {
            throw new HttpException(HttpStatus.BadRequest, `User role is already ${roleExists.role_name}`);
        }

        const updateUserId = await this.userSchema.updateOne(
            { _id: user_id },
            { role_code: model.role_code, updated_at: new Date() },
        );

        if (!updateUserId.acknowledged) {
            throw new HttpException(HttpStatus.BadRequest, 'Update user status failed!');
        }

        return true;
    }

    public async update(userId: string, model: UpdateUserDto): Promise<IUser> {
        await checkEmptyObject(model);

        // check user exits
        const userExists = await this.getItem(userId);

        if (userExists.email.toLowerCase().trim() !== model.email.toLowerCase().trim()) {
            // check email duplicates
            await this.checkEmailDuplicate(model.email);
        }

        let errorResults: IError[] = [];

        // check user_name exists
        errorResults = await this.userRepository.checkFieldsExists(
            [{ fieldName: 'user_name', fieldValue: model.user_name }],
            errorResults,
            'User',
        );

        // check all fields valid
        if (errorResults.length) {
            throw new HttpException(HttpStatus.BadRequest, '', errorResults);
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

        return this.getItem(userId);
    }

    public async delete(userId: string): Promise<boolean> {
        // check item exists
        await this.getItem(userId);

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
