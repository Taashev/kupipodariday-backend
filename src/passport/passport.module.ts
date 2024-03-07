import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from 'src/users/users.module';

import { PassportController } from './passport.controller';
import { PassportService } from './passport.service';
import { JwtStrategy } from './strategy/jwt-strategy';
import { LocalStrategy } from './strategy/local-strategy';

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
  providers: [PassportService, JwtStrategy, LocalStrategy],
})
export class PassportModule {}
