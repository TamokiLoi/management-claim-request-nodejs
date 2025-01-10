import bcryptjs from 'bcryptjs';

export const isEmptyObject = (obj: any): boolean => {
    return !Object.keys(obj).length;
};

export const formatResponse = <T>(data: T, success: boolean = true) => {
    return {
        success,
        data,
    };
};

export const encodePassword = async (password: string) => {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password!, salt);
    return hashedPassword;
};
