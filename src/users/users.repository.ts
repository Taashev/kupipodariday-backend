import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { User } from './entities/users.entity';
import { UserDto } from './dto/userDto';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findById(id: UserDto['id']): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async save(user: CreateUserDto): Promise<User> {
    const existingUser =
      user.id && (await this.userRepository.findOneBy({ id: user.id }));

    if (existingUser) {
      throw new BadRequestException(
        'User with the specified ID already exists',
      );
    }

    return await this.userRepository.save(user);
  }
}
