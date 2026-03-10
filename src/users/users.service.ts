import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAlreadyExitsException } from '../customException/user-already-exists.exception';
import { CreateUserDto } from './dtos/createUser.dto';
import { BcryptProvider } from './providers/bcrypt.provider';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private bcryptProvider: BcryptProvider,
  ) {}

  public async createUser(user: CreateUserDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (existingUser) {
        throw new UserAlreadyExitsException('email', user.email);
      }
      const newUser = this.userRepository.create({
        ...user,
        password: await this.bcryptProvider.hashPassword(user.password),
      });
      return await this.userRepository.save(newUser);
    } catch (error: unknown) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'An error occurred',
      );
    }
  }
}
