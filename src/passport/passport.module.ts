import { Module } from '@nestjs/common';

import { PassportController } from './passport.controller';
import { PassportService } from './passport.service';

import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [PassportController],
  providers: [PassportService],
})
export class PassportModule {}
