import { Exclude } from 'class-transformer';

import { UserDto } from './user.dto';

export class UserPublicProfileResponseDto extends UserDto {
  @Exclude()
  email: UserDto['email'];

  @Exclude()
  password: UserDto['password'];

  constructor(partial: Partial<UserPublicProfileResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
