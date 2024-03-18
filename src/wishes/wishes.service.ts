import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    wishId: Wish['id'],
    options: { owner: boolean } = { owner: false },
  ): Promise<Wish> {
    const wish = await this.wishRepository.findById(wishId, options);

    if (!wish) {
      throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND_WISH);
    }

    return wish;
  }

  async createWish(createWishDto: CreateWishDto, user: User): Promise<Wish> {
    createWishDto.owner = user;

    const createWish = this.wishRepository.create(createWishDto);

    const wish = await this.wishRepository.save(createWish);

    return wish;
  }

  async updateById(
    wishId: Wish['id'],
    user: User,
    updateWish: UpdateWishDto,
  ): Promise<void> {
    const wish = await this.wishRepository.findById(wishId, { owner: true });

    if (!wish) {
      throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND_WISH);
    }

    const wishOwner = wish.owner;

    if (user.id !== wishOwner.id) {
      throw new ForbiddenException(MESSAGE_ERROR.FORBIDDEN_UPDATE_WISH);
    }

    await this.wishRepository.updateById(wishId, updateWish);
  }

  async deleteWish(wishId: Wish['id'], user: User): Promise<Wish> {
    const wish = await this.wishRepository.findById(wishId, { owner: true });

    if (!wish) {
      throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND_WISH);
    }

    const wishOwner = wish.owner;

    if (user.id !== wishOwner.id) {
      throw new ForbiddenException(MESSAGE_ERROR.FORBIDDEN_UPDATE_WISH);
    }

    const deleteWish = await this.wishRepository.deleteById(wishId);

    if (!deleteWish?.affected) {
      throw new BadRequestException(MESSAGE_ERROR.BAD_REQUEST_DELETE_WISH);
    }

    return wish;
  }
}
