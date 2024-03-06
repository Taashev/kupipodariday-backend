import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { PassportService } from '../passport.service';

import { UsersRepository } from 'src/users/users.repository';

import { MESSAGE_ERROR } from 'src/utils/constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly passportService: PassportService,
    private readonly usersRepository: UsersRepository,
  ) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.usersRepository.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException(MESSAGE_ERROR.AUTH_USER);
    }

    const isValidPassword = await this.passportService.validatePassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException(MESSAGE_ERROR.AUTH_USER);
    }

    delete user.password;

    return user;
  }
}
