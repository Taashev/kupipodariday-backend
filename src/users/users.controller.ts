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
import { User } from './entities/users.entity';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { SerializeUserResponseInterceptor } from './interceptors/serialize-user-response.interceptor';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(
    new SerializeUserResponseInterceptor('UserPublicProfileResponseDto'),
  )
  async findAll(): Promise<UserPublicProfileResponseDto[]> {
    const users = await this.usersService.findAll();

    return users;
  }

  @Get('me')
  @UseGuards(JwtGuard)
  @UseInterceptors(
    new SerializeUserResponseInterceptor('UserProfileResponseDto'),
  )
  async getCurrentUser(@Req() req: Request): Promise<UserProfileResponseDto> {
    const requestUser = req.user;

    return requestUser;
  }

  @Get(':username')
  @UseInterceptors(
    new SerializeUserResponseInterceptor('UserPublicProfileResponseDto'),
  )
  async findByUsername(
    @Param('username') username: User['username'],
  ): Promise<UserPublicProfileResponseDto> {
    const user = await this.usersService.findByUsername(username);

    return user;
  }

  @Post('find')
  @UseGuards(JwtGuard)
  @UseInterceptors(
    new SerializeUserResponseInterceptor('UserProfileResponseDto'),
  )
  async findUsers(
    @Body() findUsersDto: FindUsersDto,
  ): Promise<UserProfileResponseDto[]> {
    const users = await this.usersService.findUsers(findUsersDto);

    return users;
  }

  @Patch('me')
  @UseGuards(JwtGuard)
  @UseInterceptors(
    new SerializeUserResponseInterceptor('UserProfileResponseDto'),
  )
  async updateProfile(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserProfileResponseDto> {
    const userRequest = req.user;

    const user = await this.usersService.updateUser(
      userRequest.id,
      updateUserDto,
    );

    return user;
  }
}
