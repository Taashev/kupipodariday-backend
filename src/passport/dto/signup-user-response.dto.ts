import { Exclude } from 'class-transformer';

import { User } from '../../users/entities/users.entity';

export class SignupUserResponseDto extends User {
  @Exclude()
  password: User['password'];

  constructor(partial: Partial<SignupUserResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
