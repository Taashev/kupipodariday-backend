import { Exclude } from 'class-transformer';
import { OmitType, PartialType } from '@nestjs/mapped-types';

import { User } from '../entities/users.entity';
import { UserDto } from './user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(UserDto, ['id', 'createdAt', 'updatedAt']),
) {
  @Exclude()
  id: User['id'];

  @Exclude()
  createdAt: User['createdAt'];

  @Exclude()
  updatedAt: User['updatedAt'];
}
