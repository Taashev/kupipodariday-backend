import { Injectable } from '@nestjs/common';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';

import { User } from './entities/users.entity';

import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';
import { UserDto } from './dto/user.dto';

type DtoProp = 'UserProfileResponseDto' | 'UserPublicProfileResponseDto';

type UserProp = User | UserDto;

@Injectable()
export class UsersSerializeService {
  public serialize(
    dto: DtoProp,
    user: UserProp,
    options: ClassTransformOptions = { excludeExtraneousValues: false },
  ) {
    switch (dto) {
      case 'UserProfileResponseDto':
        return plainToInstance(UserProfileResponseDto, user, options);
      case 'UserPublicProfileResponseDto':
        return plainToInstance(UserPublicProfileResponseDto, user, options);
      default:
        delete user.email;
        delete user.password;
        return user;
    }
  }
}
