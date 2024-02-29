import { Controller, Get, Param } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: User['id']): Promise<User> {
    return this.usersService.findById(id);
  }
}
