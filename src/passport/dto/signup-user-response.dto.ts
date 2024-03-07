import { Exclude } from 'class-transformer';

import { User } from '../../users/entities/users.entity';

export class SignupUserResponseDto {
  @Exclude()
  password: User['password'];

  constructor(partial: Partial<SignupUserResponseDto>) {
    Object.assign(this, partial);
  }
}
