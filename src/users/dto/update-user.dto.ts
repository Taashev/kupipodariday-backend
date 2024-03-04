import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';
import { Exclude } from 'class-transformer';

import { User } from '../entities/users.entity';

export class UpdateUserDto {
  @Exclude()
  @IsOptional()
  @IsString()
  @IsUUID()
  id: User['id'];

  @Exclude()
  @IsOptional()
  @IsDate()
  createdAt: User['createdAt'];

  @Exclude()
  @IsOptional()
  @IsDate()
  updatedAt: User['updatedAt'];

  @IsOptional()
  @IsEmail()
  email: User['email'];

  @IsOptional()
  @IsString()
  @MinLength(2)
  password: User['password'];

  @IsOptional()
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
