import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

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
    return this.userRepository.findOneBy({ id });
  }

  async save(createUserDto: CreateUserDto): Promise<User> {
    const existingUser =
      createUserDto.id &&
      (await this.userRepository.findOneBy({ id: createUserDto.id }));

    if (existingUser) {
      throw new BadRequestException(
        'User with the specified ID already exists',
      );
    }

    return await this.userRepository.save(createUserDto);
  }
}
