import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptProvider } from './providers/bcrypt.provider';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, BcryptProvider],
  exports: [UsersService],
})
export class UsersModule {}
