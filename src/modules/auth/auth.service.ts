import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { TIME_LOGIN_EXPIRES } from '../../core/constants';
import { HttpStatus } from '../../core/enums';
import { HttpException } from '../../core/exceptions';
import { createTokenVerifiedUser, encodePasswordUserNormal, sendMail } from '../../core/utils';
import { IUser, UserSchema } from '../user';
import { DataStoredInToken, TokenData } from './auth.interface';
import LoginDto from './dto/login.dto';

export default class AuthService {
    public userSchema = UserSchema;

    public async login(model: LoginDto): Promise<TokenData> {
        const { email, password } = model;

        const user = await this.userSchema.findOne({ email }).exec();
        if (!user) {
            throw new HttpException(HttpStatus.BadRequest, `Your email: ${email} is not exists.`);
        }

        if (!user.is_verified) {
            throw new HttpException(HttpStatus.BadRequest, 'User is not verified! Please check your email in 24h!');
        }

        // check password match
        const isMatchPassword = await bcryptjs.compare(password, user.password!);
        if (!isMatchPassword) {
            throw new HttpException(HttpStatus.BadRequest, `Your password is incorrect!`);
        }

        // check status user
        if (user.is_blocked || user.is_deleted) {
            const reason = user.is_blocked
                ? 'locked. Please contact admin via mail to activate!'
                : 'deleted. Please contact admin via mail for assistance!';
            throw new HttpException(HttpStatus.Forbidden, `Your account has been ${reason}`);
        }

        if (!user.token_version) {
            user.token_version = 0;
        }

        return this.createToken(user);
    }

    public async logout(userId: string): Promise<boolean> {
        const user = await this.userSchema.findByIdAndUpdate(userId, { $inc: { token_version: 1 } });
        if (!user) {
            throw new HttpException(HttpStatus.BadRequest, `Cannot update user!`);
        }
        return true;
    }

    public async getLoginUserInfo(userId: string): Promise<IUser> {
        const user = await this.userSchema.findById(userId).lean();
        if (!user) {
            throw new HttpException(HttpStatus.BadRequest, `User is not exists.`);
        }
        delete user.password;
        return user;
    }

    public async verifiedTokenUser(verifiedToken: string): Promise<boolean> {
        const user = await this.userSchema.findOne({
            verification_token: verifiedToken,
        });

        if (!user) {
            throw new HttpException(HttpStatus.BadRequest, `Token is not valid.`);
        }
        const tokenExpires = moment(
            user?.verification_token_expires?.toString(),
            'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ',
        ).toDate();
        if (moment(new Date()).isAfter(moment(tokenExpires))) {
            throw new HttpException(HttpStatus.BadRequest, `Token is expired!`);
        }

        user.is_verified = true;
        user.verification_token = undefined;
        user.verification_token_expires = undefined;
        user.updated_at = new Date();

        const updateUserId = await user.save();
        if (!updateUserId) {
            throw new HttpException(HttpStatus.BadRequest, 'Cannot update user!');
        }

        return true;
    }

    public async resendTokenUser(email: string): Promise<boolean> {
        const user = await this.userSchema.findOne({ email }).exec();
        if (!user) {
            throw new HttpException(HttpStatus.BadRequest, `User with mail: ${email} is not exists.`);
        }

        if (user.is_verified) {
            throw new HttpException(
                HttpStatus.BadRequest,
                `User with mail: ${email} has already verified their email.`,
            );
        }

        // create token verification
        const tokenData = createTokenVerifiedUser();
        user.is_verified = false;
        user.verification_token = tokenData.verification_token;
        user.verification_token_expires = tokenData.verification_token_expires;
        user.updated_at = new Date();
        const domain = process.env.DOMAIN_FE;

        // send mail with token
        const sendMailResult = await sendMail({
            toMail: user.email,
            subject: 'Verify your email address',
            content: `Hello, ${user.user_name}.\nPlease click the following link to verify your email address:\n${domain}/verify-email/${tokenData.verification_token}`,
        });
        if (!sendMailResult) {
            throw new HttpException(HttpStatus.BadRequest, `Cannot send mail for ${user.email}`);
        }

        const updateUser = await user.save();
        if (!updateUser) {
            throw new HttpException(HttpStatus.BadRequest, 'Cannot update user!');
        }

        return true;
    }

    public async forgotPassword(email: string): Promise<boolean> {
        const user = await this.userSchema.findOne({ email, is_deleted: false, is_blocked: false, is_verified: true });
        if (!user) {
            throw new HttpException(HttpStatus.BadRequest, `User with mail: ${email} is not exists.`);
        }

        // handle encode password
        const generateRandomPassword = this.generateRandomPassword(10);

        // send mail with new password
        const sendMailResult = await sendMail({
            toMail: user.email,
            subject: 'Generate new password for user',
            html: `Hello, ${user.user_name}.<br>This is a new password for ${user.email} is:<br><strong>${generateRandomPassword}</strong>`,
        });
        if (!sendMailResult) {
            throw new HttpException(HttpStatus.BadRequest, `Cannot send mail for ${user.email}`);
        }

        const newPassword = await encodePasswordUserNormal(generateRandomPassword);
        user.password = newPassword;
        user.updated_at = new Date();
        const updateUser = await user.save();
        if (!updateUser) {
            throw new HttpException(HttpStatus.BadRequest, 'Cannot update user!');
        }

        return true;
    }

    private createToken = (user: IUser): TokenData => {
        const dataInToken: DataStoredInToken = { id: user.id, role_code: user.role_code, version: user.token_version };
        const secret: string = process.env.JWT_TOKEN_SECRET!;
        const expiresIn: number = TIME_LOGIN_EXPIRES;
        return {
            token: jwt.sign(dataInToken, secret, { expiresIn }),
        };
    };

    private generateRandomPassword(length: number) {
        return crypto
            .randomBytes(length)
            .toString('base64')
            .slice(0, length)
            .replace(/[^a-zA-Z0-9]/g, '');
    }
}
