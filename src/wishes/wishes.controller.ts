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

  @Patch(':id')
  @UseGuards(JwtGuard)
  async updateWish(
    @Req() req: Request,
    @Param('id') wishId: Wish['id'],
    @Body() updateWish: UpdateWishDto,
  ): Promise<object> {
    const user = req.user;

    await this.wishService.updateById(wishId, user, updateWish);

    return {};
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async deleteWish(
    @Req() req: Request,
    @Param('id') wishId: Wish['id'],
  ): Promise<Wish> {
    const user = req.user;

    const deleteWish = await this.wishService.deleteWish(wishId, user);

    deleteWish.owner = this.usersSerializeService.UserPublicProfileResponseDto(
      deleteWish.owner,
    );

    return deleteWish;
  }
}
