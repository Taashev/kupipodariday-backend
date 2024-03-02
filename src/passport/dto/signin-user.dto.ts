import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class SignInUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  password: string;
}
