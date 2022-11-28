import * as bcrypt from 'bcrypt';

export class HashProvider {
    private static saltRounds: number = 10;

    public static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    public static async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
