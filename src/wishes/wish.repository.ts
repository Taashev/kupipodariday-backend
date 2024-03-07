import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/createWish.dto';

@Injectable()
export class WishRepository {
  constructor(
    @InjectRepository(Wish) private readonly wishRepository: Repository<Wish>,
  ) {}

  create(createWishDto: CreateWishDto): Wish {
    const wish = this.wishRepository.create(createWishDto);

    return wish;
  }

  async save(createWish: CreateWishDto): Promise<Wish> {
    const wish = this.wishRepository.save(createWish);

    return wish;
  }
}
