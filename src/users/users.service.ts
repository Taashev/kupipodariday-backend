import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { UsersRepository } from './users.repository';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDto } from './dto/userDto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  findById(id: UserDto['id']): Promise<User> {
    return this.usersRepository.findById(id);
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const hashPassword = await bcrypt.hash(user.password, 10);

    user.password = hashPassword;

    return this.usersRepository.save(user);
  }
}
