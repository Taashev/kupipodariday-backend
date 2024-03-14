import { Exclude } from 'class-transformer';
import { OmitType } from '@nestjs/mapped-types';

import { User } from '../entities/users.entity';
import { UserDto } from './user.dto';

export class UserProfileResponseDto extends OmitType(UserDto, ['password']) {
  @Exclude()
  password: User['password'];

  constructor(partial: Partial<UserProfileResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
