import { Request } from 'express';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { JwtGuard } from 'src/passport/guards/jwt.guard';

import { WishesService } from './wishes.service';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UsersSerializeService } from 'src/users/users-serialize.service';
import { UpdateWishDto } from './dto/update-wish.dto';
import { IsWishOwnerInterceptor } from './interceptors/is-wish-owner.interceptor';

@Controller('wishes')
@UseInterceptors(ClassSerializerInterceptor)
export class WishesController {
  constructor(
    private readonly wishService: WishesService,
    private readonly usersSerializeService: UsersSerializeService,
  ) {}

  @Get(':id')
  @UseGuards(JwtGuard)
  async findById(@Param('id') wishId: Wish['id']) {
    const wish = await this.wishService.findById(wishId, { owner: true });

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

  @Post(':id/copy')
  @UseGuards(JwtGuard)
  async copyWish(
    @Req() req: Request,
    @Param('id') wishId: Wish['id'],
  ): Promise<object> {
    const user = req.user;

    const wish = await this.findById(wishId);

    const createWishDto = await this.wishService.serializeCreateWishDto(wish);

    await this.wishService.createWish(createWishDto, user);

    return {};
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @UseInterceptors(IsWishOwnerInterceptor)
  async updateWish(
    @Param('id') wishId: Wish['id'],
    @Body() updateWish: UpdateWishDto,
  ): Promise<object> {
    await this.wishService.updateById(wishId, updateWish);

    return {};
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @UseInterceptors(IsWishOwnerInterceptor)
  async deleteWish(@Param('id') wishId: Wish['id']): Promise<Wish> {
    const wish = await this.wishService.findById(wishId, { owner: true });

    await this.wishService.deleteWish(wishId);

    wish.owner = this.usersSerializeService.serialize(
      'UserPublicProfileResponseDto',
      wish.owner,
    );

    return wish;
  }
}
