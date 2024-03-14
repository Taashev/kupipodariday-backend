import { Request } from 'express';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { JwtGuard } from 'src/passport/guards/jwt.guard';

import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UsersSerializeService } from 'src/users/users-serialize.service';

@Controller('wishes')
@UseInterceptors(ClassSerializerInterceptor)
export class WishesController {
  constructor(
    private readonly wishService: WishesService,
    private readonly usersSerializeService: UsersSerializeService,
  ) {}

  @Get(':id')
  @UseGuards(JwtGuard)
  async findById(@Param('id') id: string) {
    const wish = await this.wishService.findById(id, { owner: true });

    wish.owner = this.usersSerializeService.serialize(
      'UserPublicProfileResponseDto',
      wish.owner,
    );

    return wish;
  }

  @Post()
  @UseGuards(JwtGuard)
  async createWish(
    @Req() req: Request,
    @Body() createWishDto: CreateWishDto,
  ): Promise<object> {
    const user = req.user;

    await this.wishService.createWish(createWishDto, user);

    return {};
  }
}
