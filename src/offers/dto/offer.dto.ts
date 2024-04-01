import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import { User } from 'src/users/entities/users.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

export class OfferDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number = 0;

  @IsBoolean()
  hidden: boolean = false;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => User)
  user: User;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Wish)
  item: Wish;
}
