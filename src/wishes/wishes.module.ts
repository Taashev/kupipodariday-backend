import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WishesController } from './wishes.controller';
import { WishesService } from './wishes.service';
import { WishesRepository } from './wishes.repository';
import { Wish } from './entities/wish.entity';
import { UsersSerializeService } from 'src/users/users-serialize.service';
import { IsWishOwnerInterceptor } from './interceptors/is-wish-owner.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([Wish])],
  controllers: [WishesController],
  providers: [
    WishesService,
    WishesRepository,
    UsersSerializeService,
    IsWishOwnerInterceptor,
  ],
})
export class WishesModule {}
