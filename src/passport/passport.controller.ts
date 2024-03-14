import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PassportService } from './passport.service';
import { Request, Response } from 'express';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

import { UsersSerializeService } from 'src/users/users-serialize.service';

import { LocalGuard } from './guards/local.guard';
import { SignInUserResponseDto } from './dto/signin-user-response.dto';
import { SignupUserResponseDto } from './dto/signup-user-response.dto';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class PassportController {
  constructor(
    private readonly passportService: PassportService,
    private readonly usersService: UsersService,
    private readonly usersSerializeService: UsersSerializeService,
  ) {}

  @Post('signup')
  async signup(
    @Res({ passthrough: true }) res: Response,
    @Body() createUserDto: CreateUserDto,
  ): Promise<SignupUserResponseDto> {
    const user = await this.usersService.createUser(createUserDto);

    const jwt = await this.passportService.auth(user.id);

    res.cookie('access_token', jwt.access_token, { httpOnly: true });

    const userResponseDto = this.usersSerializeService.serialize(
      'UserProfileResponseDto',
      user,
    );

    return userResponseDto;
  }

  @Post('signin')
  @UseGuards(LocalGuard)
  async signIn(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignInUserResponseDto> {
    const user = req.user;

    const jwt = await this.passportService.auth(user.id);

    res.cookie('access_token', jwt.access_token, { httpOnly: true });

    return jwt;
  }
}
