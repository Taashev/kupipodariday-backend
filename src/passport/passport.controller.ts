import { Body, Controller, Post, Res } from '@nestjs/common';
import { SignInUserDto } from './dto/signin-user.dto';
import { PassportService } from './passport.service';
import { Response } from 'express';
import { SignInUserResponseDto } from './dto/signin-user-response.dto';

@Controller('signin')
export class PassportController {
  constructor(private readonly passportService: PassportService) {}

  @Post()
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() signInUserDto: SignInUserDto,
  ): Promise<SignInUserResponseDto> {
    const response =
      await this.passportService.authByUsernameEndPassword(signInUserDto);

    res.cookie('access_token', response.access_token, { httpOnly: true });

    return response;
  }
}
