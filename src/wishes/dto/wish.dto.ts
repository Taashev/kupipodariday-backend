import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  IsUrl,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import { UserDto } from 'src/users/dto/user.dto';
import { OfferDto } from 'src/offers/dto/offer.dto';

export class WishDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  link: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  raised: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  copied: number;

  @IsNotEmpty()
  @IsString()
  @Length(0, 1024)
  description: string;

  @ValidateNested()
  @Type(() => UserDto)
  owner: UserDto;

  @ValidateNested()
  @Type(() => OfferDto)
  offers: OfferDto[];
}
