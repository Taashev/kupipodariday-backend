import { Request } from 'express';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';
import { JwtGuard } from 'src/passport/guards/jwt.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserPublicProfileResponseDto[]> {
    const users = await this.usersService.findAll();

    const usersPublicProfileResponseDto =
      this.usersService.serializeUserResponseDto(
        UserPublicProfileResponseDto,
        users,
      );

    return usersPublicProfileResponseDto;
  }

  @Get('me')
  @UseGuards(JwtGuard)
  profile(@Req() req: Request) {
    const user = req.user as User;

    return user;
  }

  @Get(':username')
  async findByUsername(
    @Param('username') username: User['username'],
  ): Promise<UserPublicProfileResponseDto> {
    const user = await this.usersService.findByUsername(username);

    const userPublicProfileResponseDto =
      this.usersService.serializeUserResponseDto(
        UserPublicProfileResponseDto,
        user,
      );

    return userPublicProfileResponseDto;
  }
}
