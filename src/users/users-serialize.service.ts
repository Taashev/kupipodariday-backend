import { Injectable } from '@nestjs/common';

import { User } from './entities/users.entity';

import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';

type SerializeDto = 'UserProfileResponseDto' | 'UserPublicProfileResponseDto';

export type SerializeResponse =
  | UserProfileResponseDto
  | UserPublicProfileResponseDto;

@Injectable()
export class UsersSerializeService {
  private UserProfile = UserProfileResponseDto;
  private UserPublicProfile = UserPublicProfileResponseDto;

  public serialize(dto: SerializeDto, user: User): SerializeResponse {
    switch (dto) {
      case 'UserProfileResponseDto':
        return this.UserProfileResponseDto(user);
      case 'UserPublicProfileResponseDto':
        return this.UserPublicProfileResponseDto(user);
      default:
        delete user.email;
        delete user.password;
        return user;
    }
  }

  public UserProfileResponseDto(user: User): UserProfileResponseDto {
    return new this.UserProfile(user);
  }

  public UserPublicProfileResponseDto(
    user: User,
  ): UserPublicProfileResponseDto {
    return new this.UserPublicProfile(user);
  }
}
