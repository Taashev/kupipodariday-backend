import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { MESSAGE_ERROR } from 'src/utils/constants';

import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOne(
    key: 'username' | 'id',
    query: User['username'] | User['id'],
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ [key]: query });

    return user;
  }

  async findMany(
    key: 'username' | 'email',
    query: FindUsersDto['query'],
  ): Promise<User[]> {
    const users = await this.userRepository.findBy({ [key]: query });

    return users;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: User['id']): Promise<User> {
    if (!id) {
      throw new BadRequestException(MESSAGE_ERROR.BAD_REQUEST);
    }

    const user = await this.findOne('id', id);

    return user;
  }

  async findOneByUsername(username: User['username']): Promise<User> {
    if (!username) {
      throw new BadRequestException(MESSAGE_ERROR.BAD_REQUEST);
    }

    const user = await this.findOne('username', username);

    return user;
  }

  async findUsers(findUsersDto: FindUsersDto): Promise<User[]> {
    const findUsersByEmail = await this.findMany('email', findUsersDto.query);

    if (findUsersByEmail.length !== 0) {
      return findUsersByEmail;
    }

    const findUsersByUsername = await this.findMany(
      'username',
      findUsersDto.query,
    );

    if (findUsersByUsername.length !== 0) {
      return findUsersByUsername;
    }

    return [];
  }

  create(createUserDto: CreateUserDto): User {
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

    const user = this.findOneById(userId);

    return user;
  }
}
