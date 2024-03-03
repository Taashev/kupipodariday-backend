import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { PassportService } from './passport.service';
import { Request, Response } from 'express';
import { SignInUserResponseDto } from './dto/signin-user-response.dto';
import { LocalGuard } from './guards/local.guard';
import { User } from 'src/users/entities/users.entity';

@Controller('signin')
export class PassportController {
  constructor(private readonly passportService: PassportService) {}

  @Post()
  @UseGuards(LocalGuard)
  async signIn(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignInUserResponseDto> {
    const user = req.user as User;

    const response = await this.passportService.auth(user);

    res.cookie('access_token', response.access_token, { httpOnly: true });

    return response;
  }
}
