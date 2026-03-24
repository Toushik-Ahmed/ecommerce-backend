import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';

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
          password: String(configService.get('DB_PASSWORD')),
          database: configService.get<string>('DB_NAME'),
          autoloadEntities: true,
          synchronize: true,
          entities: [User],
        };
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
