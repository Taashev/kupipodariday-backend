import { Injectable } from '@nestjs/common';
import { WishRepository } from './wish.repository';

import { User } from 'src/users/entities/users.entity';

import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/createWish.dto';

@Injectable()
export class WishService {
  constructor(private readonly wishRepository: WishRepository) {}

  async createWish(createWishDto: CreateWishDto, user: User): Promise<Wish> {
    createWishDto.owner = user;

    const createWish = this.wishRepository.create(createWishDto);

    const wish = await this.wishRepository.save(createWish);

    return wish;
  }
}
