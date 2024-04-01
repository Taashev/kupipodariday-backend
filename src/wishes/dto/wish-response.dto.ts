import { WishDto } from './wish.dto';

export class WishResponseDto extends WishDto {
  constructor(partial: Partial<WishResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
