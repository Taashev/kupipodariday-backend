import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';

import { UsersService } from './users.service';
import { UsersSerializeService } from './users-serialize.service';

import { UsersRepository } from './users.repository';

import { User } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService, UsersRepository, UsersSerializeService],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersSerializeService],
})
export class UsersModule {}
