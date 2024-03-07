import { Exclude } from 'class-transformer';

import { WishDto } from './wish.dto';
import { Wish } from '../entities/wish.entity';
import { OmitType } from '@nestjs/mapped-types';

export class CreateWishDto extends OmitType(WishDto, [
  'id',
  'createdAt',
  'updatedAt',
  'copied',
  'raised',
] as const) {
  @Exclude()
  id: Wish['id'];

  @Exclude()
  createdAt: Wish['createdAt'];

  @Exclude()
  updatedAt: Wish['updatedAt'];

  @Exclude()
  copied: Wish['copied'];

  @Exclude()
  raised: Wish['raised'];

  @Exclude()
  owner: Wish['owner'];
}
