import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { UserPublicProfileResponseDto } from './dto/userPublicProfileResponse.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

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

  @Get(':id')
  async findById(
    @Param('id') id: User['id'],
  ): Promise<UserPublicProfileResponseDto> {
    const user = await this.usersService.findById(id);

    const userPublicProfileResponseDto =
      this.usersService.serializeUserResponseDto(
        UserPublicProfileResponseDto,
        user,
      );

    return userPublicProfileResponseDto;
  }
}
