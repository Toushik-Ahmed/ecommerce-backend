import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Loading file:', `.${process.env.NODE_ENV}.env`);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          autoloadEntities: true,
          synchronize: true,
          entities: [User],
        };
      },
    }),
    UsersModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
