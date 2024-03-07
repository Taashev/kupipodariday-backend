import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/users/entities/users.entity';

import { SignInUserResponseDto } from './dto/signin-user-response.dto';

@Injectable()
export class PassportService {
  constructor(private readonly jwtService: JwtService) {}

  async auth(id: User['id']): Promise<SignInUserResponseDto> {
    const payload = { id };

    const jwt = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { access_token: jwt };
  }

  async validatePassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    const isValidPassword = await bcrypt.compare(password, userPassword);

    return isValidPassword;
  }
}
