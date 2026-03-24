import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dtos/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  public async signUp(
    createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    const newUser = await this.usersService.createUser(createUserDto);
    return this.generateToken(newUser);
  }

  public async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({
      where: { email: signInDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.generateToken(user);
  }

  private generateToken(user: User): { accessToken: string } {
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
