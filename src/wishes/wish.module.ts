import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WishController } from './wish.controller';
import { WishService } from './wish.service';
import { WishRepository } from './wish.repository';
import { Wish } from './entities/wish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wish])],
  controllers: [WishController],
  providers: [WishService, WishRepository],
})
export class WishModule {}
