import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersRepository } from 'src/users/users.repository';

import { MESSAGE_ERROR } from 'src/utils/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies['access_token'];
        },
      ]),
      secretOrKey: configService.get<string>('jwt_secret'),
    });
  }

  async validate(jwtPayload: { id: string }) {
    const user = await this.usersRepository.findOneById(jwtPayload.id);

    if (!user) {
      throw new UnauthorizedException(MESSAGE_ERROR.FORBIDDEN);
    }

    delete user.password;

    return user;
  }
}
