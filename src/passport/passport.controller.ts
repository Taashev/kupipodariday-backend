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
import { plainToInstance } from 'class-transformer';

import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserProfileResponseDto } from 'src/users/dto/user-profile-response.dto';

import { LocalGuard } from './guards/local.guard';
import { SignInUserResponseDto } from './dto/signin-user-response.dto';
import { SignupUserResponseDto } from './dto/signup-user-response.dto';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class PassportController {
  constructor(
    private readonly passportService: PassportService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async signup(
    @Res({ passthrough: true }) res: Response,
    @Body() createUserDto: CreateUserDto,
  ): Promise<SignupUserResponseDto> {
    const user = await this.usersService.createUser(createUserDto);

    const jwt = await this.passportService.auth(user.id);

    res.cookie('access_token', jwt.access_token, { httpOnly: true });

    const userResponseDto = plainToInstance(UserProfileResponseDto, user);

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
