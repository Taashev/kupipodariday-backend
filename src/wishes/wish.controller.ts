import { Request } from 'express';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { JwtGuard } from 'src/passport/guards/jwt.guard';

import { WishService } from './wish.service';
import { CreateWishDto } from './dto/createWish.dto';

@Controller('wishes')
@UseInterceptors(ClassSerializerInterceptor)
export class WishController {
  constructor(private readonly wishService: WishService) {}

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
