import { Request } from 'express';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { JwtGuard } from 'src/passport/guards/jwt.guard';

import { UsersService } from './users.service';
import { UsersSerializeService } from './users-serialize.service';

import { User } from './entities/users.entity';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersSerializeService: UsersSerializeService,
  ) {}

  @Get()
  async findAll(): Promise<UserPublicProfileResponseDto[]> {
    const users = await this.usersService.findAll();

    const usersResponseDto = users.map((user) =>
      this.usersSerializeService.serialize(
        'UserPublicProfileResponseDto',
        user,
      ),
    );

    return usersResponseDto;
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async getCurrentUser(@Req() req: Request): Promise<UserProfileResponseDto> {
    const requestUser = req.user;

    const userResponseDto = this.usersSerializeService.serialize(
      'UserProfileResponseDto',
      requestUser,
    );

    return userResponseDto;
  }

  @Get(':username')
  async findByUsername(
    @Param('username') username: User['username'],
  ): Promise<UserPublicProfileResponseDto> {
    const user = await this.usersService.findByUsername(username);

    const userResponseDto = this.usersSerializeService.serialize(
      'UserPublicProfileResponseDto',
      user,
    );

    return userResponseDto;
  }

  @Get('me/wishes')
  @UseGuards(JwtGuard)
  async getUserMeWishes(@Req() req: Request): Promise<User['wishes']> {
    const user = await this.usersService.findById(req.user.id, {
      wishes: true,
    });

    const wishes = user.wishes;

    return wishes;
  }

  @Post('find')
  @UseGuards(JwtGuard)
  async findUsers(
    @Body() findUsersDto: FindUsersDto,
  ): Promise<UserProfileResponseDto[]> {
    const users = await this.usersService.findUsers(findUsersDto);

    const userResponseDto = users.map((user) =>
      this.usersSerializeService.serialize('UserProfileResponseDto', user),
    );

    return userResponseDto;
  }

  @Patch('me')
  @UseGuards(JwtGuard)
  async updateProfile(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserProfileResponseDto> {
    const userRequest = req.user;

    const user = await this.usersService.updateUser(
      userRequest.id,
      updateUserDto,
    );

    const userResponseDto = this.usersSerializeService.serialize(
      'UserProfileResponseDto',
      user,
    );

    return userResponseDto;
  }
}
