import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SignInUserDto } from './dto/signin-user.dto';

import { UsersRepository } from 'src/users/users.repository';
import { SignInUserResponseDto } from './dto/signin-user-response.dto';

import { MESSAGE_ERROR } from 'src/utils/constants';

@Injectable()
export class PassportService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async authByUsernameEndPassword(
    signInUserDto: SignInUserDto,
  ): Promise<SignInUserResponseDto> {
    const { username, password } = signInUserDto;

    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException(MESSAGE_ERROR.AUTH_USER);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(MESSAGE_ERROR.AUTH_USER);
    }

    const payload = { sub: user.id };

    const jwt = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { access_token: jwt };
  }
}
