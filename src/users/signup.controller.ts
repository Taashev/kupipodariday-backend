import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('signup')
export class SignUpController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.createUser(user);
  }
}
