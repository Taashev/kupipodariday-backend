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

import { LocalGuard } from './guards/local.guard';
import { SignInUserResponseDto } from './dto/signin-user-response.dto';
import { SignupUserResponseDto } from './dto/signup-user-response.dto';

import { User } from 'src/users/entities/users.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller()
export class PassportController {
  constructor(
    private readonly passportService: PassportService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  async signup(
    @Res({ passthrough: true }) res: Response,
    @Body() createUserDto: CreateUserDto,
  ): Promise<SignupUserResponseDto> {
    const user = await this.usersService.createUser(createUserDto);

    const signupUserResponseDto = this.usersService.serializeUserResponseDto(
      SignupUserResponseDto,
      user,
    );

    const jwt = await this.passportService.auth(signupUserResponseDto);

    res.cookie('access_token', jwt.access_token, { httpOnly: true });

    return signupUserResponseDto;
  }

  @Post('signin')
  @UseGuards(LocalGuard)
  async signIn(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignInUserResponseDto> {
    const user = req.user as User;

    const jwt = await this.passportService.auth(user);

    res.cookie('access_token', jwt.access_token, { httpOnly: true });

    return jwt;
  }
}
