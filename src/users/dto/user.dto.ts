import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Length,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { User } from '../entities/users.entity';

export class UserDto implements User {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: User['createdAt'];

  @IsNotEmpty()
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

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => User['wishes'])
  wishes: User['wishes'];
}
