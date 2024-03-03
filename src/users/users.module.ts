import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { User } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService, UsersRepository],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
