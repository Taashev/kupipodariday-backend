import { OmitType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';

import { User } from '../entities/users.entity';
import { UserDto } from './user.dto';

export class CreateUserDto extends OmitType(UserDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {
  @Exclude()
  id: User['id'];

  @Exclude()
  createdAt: User['createdAt'];

  @Exclude()
  updatedAt: User['updatedAt'];
}
