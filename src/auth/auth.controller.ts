import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
