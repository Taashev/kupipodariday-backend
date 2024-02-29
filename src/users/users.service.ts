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

  findById(id: User['id']): Promise<User> {
    return this.usersRepository.findById(id);
  }

  createUser(user: CreateUserDto): Promise<User> {
    return this.usersRepository.save(user);
  }
}
