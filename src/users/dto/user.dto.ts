import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Length,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import { WishDto } from 'src/wishes/dto/wish.dto';
// import { OfferDto } from 'src/offers/dto/offer.dto';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  username: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  avatar: string;

  @IsOptional()
  @IsString()
  @Length(2, 200)
  about: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => WishDto)
  wishes: WishDto[];

  // @IsOptional()
  // @IsArray()
  // @ValidateNested()
  // @Type(() => OfferDto)
  // offers: OfferDto;
}
