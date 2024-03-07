import { Exclude } from 'class-transformer';

import { User } from '../entities/users.entity';

export class UserPublicProfileResponseDto {
  @Exclude()
  email: User['email'];

  @Exclude()
  password: User['password'];

  constructor(partial: Partial<UserPublicProfileResponseDto>) {
    Object.assign(this, partial);
  }
}
