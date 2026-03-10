import * as bcrypt from 'bcrypt';

export class BcryptProvider {
  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, salt);
  }
}
