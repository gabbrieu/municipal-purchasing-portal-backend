import * as bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export async function verifyPassword(
    passwordSent: string,
    storedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(passwordSent, storedPassword);
}
