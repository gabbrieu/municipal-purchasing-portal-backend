import * as bcrypt from 'bcryptjs';

export abstract class HashUtils {
    static async hashPassword(password: string): Promise<string> {
        const salt: string = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    static async verifyPassword(
        passwordSent: string,
        storedPassword: string
    ): Promise<boolean> {
        return await bcrypt.compare(passwordSent, storedPassword);
    }
}
