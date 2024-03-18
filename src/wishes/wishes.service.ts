import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WishesRepository } from './wishes.repository';

import { User } from 'src/users/entities/users.entity';

import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { MESSAGE_ERROR } from 'src/utils/constants';
import { DeleteResult } from 'typeorm';

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
    updateWish: UpdateWishDto,
  ): Promise<void> {
    await this.wishRepository.updateById(wishId, updateWish);
  }

  async deleteWish(wishId: Wish['id']): Promise<DeleteResult> {
    const deleteResult = await this.wishRepository.deleteById(wishId);

    const isDelete = deleteResult?.affected ? true : false;

    if (!isDelete) {
      throw new BadRequestException(MESSAGE_ERROR.BAD_REQUEST_DELETE_WISH);
    }

    return deleteResult;
  }

  async serializeCreateWishDto(wish: Wish): Promise<CreateWishDto> {
    delete wish.id;
    delete wish.createdAt;
    delete wish.updatedAt;
    delete wish.owner;
    delete wish.raised;
    delete wish.copied;

    return wish;
  }
}
