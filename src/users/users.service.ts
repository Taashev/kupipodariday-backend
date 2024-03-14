import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { SALT } from '../utils/constants';

import { UsersRepository } from './users.repository';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async findById(
    id: User['id'],
    options: { wishes: boolean } = { wishes: false },
  ): Promise<User> {
    return await this.usersRepository.findOneById(id, options);
  }

  async findByUsername(username: User['username']): Promise<User> {
    const user = await this.usersRepository.findOneByUsername(username);

    return user;
  }

  async findUsers(findUsersDto: FindUsersDto): Promise<User[]> {
    const users = this.usersRepository.findUsers(findUsersDto);

    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);

    const hashPassword = await this.hashPassword(user.password);

    user.password = hashPassword;

    return this.usersRepository.save(user);
  }

  async updateUser(
    userId: User['id'],
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    if (updateUserDto.password) {
      const hashPassword = await this.hashPassword(updateUserDto.password);

      updateUserDto.password = hashPassword;
    }

    const user = await this.usersRepository.update(userId, updateUserDto);

    return user;
  }

  async hashPassword(password: User['password'], salt = SALT): Promise<string> {
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
  }
}
