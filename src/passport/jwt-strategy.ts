import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersRepository: UsersRepository,
    private configService: ConfigService,
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
    const user = await this.usersRepository.findById(jwtPayload.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
