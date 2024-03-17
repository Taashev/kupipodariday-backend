import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MESSAGE_ERROR } from 'src/utils/constants';

import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { TypeOrmException } from 'src/exceptions/typeorm.exception';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesRepository {
  constructor(
    @InjectRepository(Wish) private readonly wishRepository: Repository<Wish>,
  ) {}

  async findById(
    id: string,
    options: { owner: boolean } = { owner: false },
  ): Promise<Wish> {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: { owner: options.owner },
    });

    if (!wish) {
      throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND_WISH);
    }

    return wish;
  }

  create(createWishDto: CreateWishDto): Wish {
    const wish = this.wishRepository.create(createWishDto);

    return wish;
  }

  async save(createWish: CreateWishDto): Promise<Wish> {
    try {
      const wish = this.wishRepository.save(createWish);

      return wish;
    } catch (error) {
      throw new TypeOrmException(error);
    }
  }

  async updateById(wishId: string, updateWish: UpdateWishDto) {
    try {
      await this.wishRepository.update({ id: wishId }, updateWish);
    } catch (error) {
      throw new TypeOrmException(error);
    }
  }
}
