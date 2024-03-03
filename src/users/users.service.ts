import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { SALT } from '../utils/constants';

import { UsersRepository } from './users.repository';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async findById(id: User['id']): Promise<User> {
    return await this.usersRepository.findById(id);
  }

  async findByUsername(username: User['username']): Promise<User> {
    const user = await this.usersRepository.findByUsername(username);

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);

    const hashPassword = await bcrypt.hash(user.password, SALT);

    user.password = hashPassword;

    return this.usersRepository.save(user);
  }

  serializeUserResponseDto(ClassDto: any, user: User | User[]) {
    if (Array.isArray(user)) {
      return user.map((user) => new ClassDto(user));
    } else {
      return new ClassDto(user);
    }
  }
}
