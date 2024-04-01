import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { MESSAGE_ERROR } from 'src/utils/constants';
import { TypeOrmException } from 'src/exceptions/typeorm.exception';

import { User } from './entities/users.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOne(
    key: 'username' | 'id',
    query: UserDto['username'] | UserDto['id'],
    options: { wishes: boolean } = { wishes: false },
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { [key]: query },
      relations: { wishes: options.wishes },
    });

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

  async findOneById(
    id: UserDto['id'],
    options: { wishes: boolean } = { wishes: false },
  ): Promise<User> {
    if (!id) {
      throw new BadRequestException(MESSAGE_ERROR.BAD_REQUEST);
    }

    const user = await this.findOne('id', id, options);

    return user;
  }

  async findOneByUsername(username: UserDto['username']): Promise<User> {
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
    const user = this.userRepository.create(createUserDto);

    return user;
  }

  async save(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.save(createUserDto);

      return user;
    } catch (error) {
      throw new TypeOrmException(error);
    }
  }

  async update(
    userId: UserDto['id'],
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    try {
      await this.userRepository.update(userId, updateUserDto);
    } catch (error) {
      throw new TypeOrmException(error);
    }
  }
}
