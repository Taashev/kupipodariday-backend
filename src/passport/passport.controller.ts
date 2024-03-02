import { Body, Controller, Post } from '@nestjs/common';
import { SignInUserDto } from './dto/signin-user.dto';
import { PassportService } from './passport.service';

@Controller('signin')
export class PassportController {
  constructor(private readonly passportService: PassportService) {}

  @Post()
  signIn(@Body() signInUserDto: SignInUserDto): any {
    const { username, password } = signInUserDto;

    const user = this.passportService.authByUsernameEndPassword(
      username,
      password,
    );

    return user;
  }
}
