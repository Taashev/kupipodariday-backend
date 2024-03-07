import { Exclude } from 'class-transformer';

import { Wish } from '../entities/wish.entity';
import { OmitType } from '@nestjs/mapped-types';
import { WishDto } from './wish.dto';

export class WishPartialDto extends OmitType(WishDto, ['owner']) {
  @Exclude()
  owner: Wish['owner'];

  constructor(partial: Partial<WishPartialDto>) {
    super();
    Object.assign(this, partial);
  }
}
