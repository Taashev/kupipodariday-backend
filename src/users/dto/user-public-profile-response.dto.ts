import { Exclude } from 'class-transformer';

import { User } from '../entities/users.entity';

export class UserPublicProfileResponseDto extends User {
  @Exclude()
  email: User['email'];

  @Exclude()
  password: User['password'];

  constructor(partial: Partial<UserPublicProfileResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
