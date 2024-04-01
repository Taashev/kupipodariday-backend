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
import { plainToInstance } from 'class-transformer';

import { JwtGuard } from 'src/passport/guards/jwt.guard';

import { UserPublicProfileResponseDto } from 'src/users/dto/user-public-profile-response.dto';

import { WishesService } from './wishes.service';

import { IsWishOwnerInterceptor } from './interceptors/is-wish-owner.interceptor';

import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { WishResponseDto } from './dto/wish-response.dto';
import { WishDto } from './dto/wish.dto';

@Controller('wishes')
@UseInterceptors(ClassSerializerInterceptor)
export class WishesController {
  constructor(private readonly wishService: WishesService) {}

  @Get(':id')
  @UseGuards(JwtGuard)
  async findById(@Param('id') wishId: WishDto['id']) {
    const wish = await this.wishService.findById(wishId, { owner: true });

    const wishResponse = plainToInstance(WishResponseDto, wish);

    wishResponse.owner = plainToInstance(
      UserPublicProfileResponseDto,
      wishResponse.owner,
    );

    return wishResponse;
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
    @Param('id') wishId: WishDto['id'],
  ): Promise<object> {
    const user = req.user;

    const wish = await this.wishService.findById(wishId);

    const createWishDto = await this.wishService.serializeCreateWishDto(wish);

    await this.wishService.createWish(createWishDto, user);

    return {};
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @UseInterceptors(IsWishOwnerInterceptor)
  async updateWish(
    @Param('id') wishId: WishDto['id'],
    @Body() updateWish: UpdateWishDto,
  ): Promise<object> {
    await this.wishService.updateById(wishId, updateWish);

    return {};
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @UseInterceptors(IsWishOwnerInterceptor)
  async deleteWish(@Param('id') wishId: WishDto['id']) {
    const wish = await this.wishService.findById(wishId, { owner: true });

    await this.wishService.deleteWish(wishId);

    const wishResponse = plainToInstance(WishResponseDto, wish);

    wishResponse.owner = plainToInstance(
      UserPublicProfileResponseDto,
      wishResponse.owner,
    );

    return wishResponse;
  }
}
