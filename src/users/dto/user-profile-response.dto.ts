import { Exclude } from 'class-transformer';

import { User } from '../entities/users.entity';

export class UserProfileResponseDto {
  @Exclude()
  password: User['password'];

  constructor(partial: Partial<UserProfileResponseDto>) {
    Object.assign(this, partial);
  }
}
