import { Exclude } from 'class-transformer';
import { User } from '../entities/users.entity';

export class UserProfileResponseDto extends User {
  @Exclude()
  password: User['password'];

  constructor(partial: Partial<UserProfileResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
