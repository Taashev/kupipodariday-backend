import { ForbiddenException, Injectable } from '@nestjs/common';
import { WishesRepository } from './wishes.repository';

import { User } from 'src/users/entities/users.entity';

import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { MESSAGE_ERROR } from 'src/utils/constants';

@Injectable()
export class WishesService {
  constructor(private readonly wishRepository: WishesRepository) {}

  async findById(
    id: string,
    options: { owner: boolean } = { owner: false },
  ): Promise<Wish> {
    const wish = await this.wishRepository.findById(id, options);

    return wish;
  }

  async createWish(createWishDto: CreateWishDto, user: User): Promise<Wish> {
    createWishDto.owner = user;

    const createWish = this.wishRepository.create(createWishDto);

    const wish = await this.wishRepository.save(createWish);

    return wish;
  }

  async updateById(
    wishId: string,
    user: User,
    updateWish: UpdateWishDto,
  ): Promise<void> {
    const wish = await this.wishRepository.findById(wishId, { owner: true });

    const wishOwner = wish.owner;

    if (user.id !== wishOwner.id) {
      throw new ForbiddenException(MESSAGE_ERROR.FORBIDDEN_UPDATE_WISH);
    }

    await this.wishRepository.updateById(wishId, updateWish);
  }
}
