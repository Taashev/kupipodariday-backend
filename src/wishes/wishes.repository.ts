import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

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
    id: Wish['id'],
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

  async updateById(
    wishId: Wish['id'],
    updateWish: UpdateWishDto,
  ): Promise<void> {
    try {
      await this.wishRepository.update({ id: wishId }, updateWish);
    } catch (error) {
      throw new TypeOrmException(error);
    }
  }

  async deleteById(wishId: Wish['id']): Promise<DeleteResult> {
    try {
      return await this.wishRepository.delete({ id: wishId });
    } catch (error) {
      throw new TypeOrmException(error);
    }
  }
}
