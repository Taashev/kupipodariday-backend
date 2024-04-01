import { WishDto } from './wish.dto';

import { OmitType } from '@nestjs/mapped-types';

export class CreateWishDto extends OmitType(WishDto, [
  'id',
  'copied',
  'raised',
  'owner',
] as const) {}
