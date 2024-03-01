import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { UsersRepository } from './users.repository';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: User['id']): Promise<User> {
    const user = await this.usersRepository.findById(id);

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);

    createUserDto.password = hashPassword;

    return this.usersRepository.save(createUserDto);
  }

  serializeUserResponseDto(ClassDto: any, user: User | User[]) {
    if (Array.isArray(user)) {
      return user.map((user) => new ClassDto(user));
    } else {
      return new ClassDto(user);
    }
  }
}
