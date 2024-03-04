import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { MESSAGE_ERROR } from 'src/utils/constants';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: User['id']): Promise<User> {
    if (!id) {
      throw new BadRequestException(MESSAGE_ERROR.BAD_REQUEST);
    }

    const user = await this.userRepository.findOneBy({ id });

    return user;
  }

  async findByUsername(username: User['username']): Promise<User> {
    if (!username) {
      throw new BadRequestException(MESSAGE_ERROR.BAD_REQUEST);
    }

    const user = await this.userRepository.findOneBy({ username });

    return user;
  }

  create(createUserDto: CreateUserDto): CreateUserDto {
    if (createUserDto.id) {
      throw new BadRequestException(MESSAGE_ERROR.ID_BAD_REQUEST);
    }

    const user = this.userRepository.create(createUserDto);

    return user;
  }

  async save(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save(createUserDto);

    return user;
  }

  async update(
    userId: User['id'],
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    if (updateUserDto.id) {
      throw new BadRequestException(MESSAGE_ERROR.ID_UPDATE);
    }

    await this.userRepository.update(userId, updateUserDto);

    const user = this.userRepository.findOneBy({ id: userId });

    return user;
  }
}
