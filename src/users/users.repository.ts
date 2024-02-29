import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findById(id: User['id']): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  save(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }
}
