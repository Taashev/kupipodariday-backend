import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PassportController } from './passport.controller';
import { PassportService } from './passport.service';

import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt_secret'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PassportController],
  providers: [PassportService, JwtStrategy],
})
export class PassportModule {}
