import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

import { User } from '../entities/users.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: User['email'];

  @IsNotEmpty()
  @IsString()
  password: User['password'];

  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  username: User['username'];

  @IsOptional()
  @IsString()
  @IsUrl()
  avatar: User['avatar'];

  @IsOptional()
  @IsString()
  @Length(2, 200)
  about: User['about'];
}
