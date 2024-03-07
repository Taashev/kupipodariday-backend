import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  IsUrl,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';

import { Wish } from '../entities/wish.entity';
import { Type } from 'class-transformer';

export class WishDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: Wish['id'];

  @IsNotEmpty()
  @IsDate()
  createdAt: Wish['createdAt'];

  @IsNotEmpty()
  @IsDate()
  updatedAt: Wish['updatedAt'];

  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: Wish['name'];

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  link: Wish['link'];

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  image: Wish['image'];

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: Wish['price'];

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  raised: Wish['raised'];

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  copied: Wish['copied'];

  @IsNotEmpty()
  @IsString()
  @Length(0, 1024)
  description: Wish['description'];

  @ValidateNested()
  @Type(() => Wish['owner'])
  owner: Wish['owner'];
}
