import { Injectable } from '@nestjs/common';

import { SignInUserDto } from './dto/signin-user.dto';

import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class PassportService {
  constructor(private usersRepository: UsersRepository) {}

  authByUsernameEndPassword(
    username: SignInUserDto['username'],
    password: SignInUserDto['password'],
  ) {
    const user = this.usersRepository.findByUsername(username);

    return user;
  }
}
