import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';

import { User } from '../entities/users.entity';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @Exclude()
  @IsOptional()
  @IsString()
  @IsUUID()
  id: string;

  @Exclude()
  @IsOptional()
  @IsDate()
  createdAt: User['createdAt'];

  @Exclude()
  @IsOptional()
  @IsDate()
  updatedAt: User['updatedAt'];

  @IsNotEmpty()
  @IsEmail()
  email: User['email'];

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
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
