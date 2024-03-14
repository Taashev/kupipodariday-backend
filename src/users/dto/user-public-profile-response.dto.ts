import { Exclude } from 'class-transformer';
import { OmitType } from '@nestjs/mapped-types';

import { User } from '../entities/users.entity';
import { UserDto } from './user.dto';

export class UserPublicProfileResponseDto extends OmitType(UserDto, [
  'email',
  'password',
]) {
  @Exclude()
  email: User['email'];

  @Exclude()
  password: User['password'];

  constructor(partial: Partial<UserPublicProfileResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
