import { Request } from 'express';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { JwtGuard } from 'src/passport/guards/jwt.guard';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';

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

  // @Get('me')
  // @UseGuards(JwtGuard)
  // profile(@Req() req: Request) {
  //   const user = req.user as User;

  //   return user;
  // }

  @Patch('me')
  @UseGuards(JwtGuard)
  async updateProfile(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserProfileResponseDto> {
    const userRequest = req.user as User;

    const user = await this.usersService.updateUser(
      userRequest.id,
      updateUserDto,
    );

    const userProfileResponseDto = this.usersService.serializeUserResponseDto(
      UserProfileResponseDto,
      user,
    );

    return userProfileResponseDto;
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
