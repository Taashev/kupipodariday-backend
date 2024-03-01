import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { SignupUserResponseDto } from './dto/signupUserResponse.dto';

@Controller('signup')
export class SignUpController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SignupUserResponseDto> {
    const user = await this.usersService.createUser(createUserDto);

    const signupUserResponseDto = this.usersService.serializeUserResponseDto(
      SignupUserResponseDto,
      user,
    );

    return signupUserResponseDto;
  }
}
