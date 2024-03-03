import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: User['id']): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    return user;
  }

  async findByUsername(username: User['username']): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });

    return user;
  }

  async save(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.id) {
      throw new BadRequestException(
        'the ID field should be generated automatically',
      );
    }

    return await this.userRepository.save(createUserDto);
  }
}
