import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { User } from 'src/users/entities/users.entity';
import { TypeOrmException } from 'src/exceptions/typeorm.exception';

import { Wish } from './entities/wish.entity';

import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { WishDto } from './dto/wish.dto';

@Injectable()
export class WishesRepository {
  constructor(
    @InjectRepository(Wish) private readonly wishRepository: Repository<Wish>,
  ) {}

  async findById(
    id: WishDto['id'],
    options: { owner: boolean } = { owner: false },
  ): Promise<Wish> {
    try {
      const wish = await this.wishRepository.findOne({
        where: { id },
        relations: { owner: options.owner },
      });

      return wish;
    } catch (error) {
      throw new TypeOrmException(error);
    }
  }

  create(createWishDto: CreateWishDto, user: User): Wish {
    const wish = this.wishRepository.create(createWishDto);

    wish.owner = user;

    return wish;
  }

  async save(createWish: Wish): Promise<Wish> {
    try {
      const wish = this.wishRepository.save(createWish);

      return wish;
    } catch (error) {
      throw new TypeOrmException(error);
    }
  }

  async updateById(
    wishId: WishDto['id'],
    updateWish: UpdateWishDto,
  ): Promise<void> {
    try {
      await this.wishRepository.update({ id: wishId }, updateWish);
    } catch (error) {
      throw new TypeOrmException(error);
    }
  }

  async deleteById(wishId: WishDto['id']): Promise<DeleteResult> {
    try {
      return await this.wishRepository.delete({ id: wishId });
    } catch (error) {
      throw new TypeOrmException(error);
    }
  }
}
