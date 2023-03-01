import { PartialType } from '@nestjs/swagger';
import { CreateWishlistDto } from './create-wishlist.dto';
import {
  IsString,
  Length,
  IsUrl,
  IsNotEmpty,
  IsArray,
  IsOptional,
} from 'class-validator';

export class UpdateWishlistDto extends PartialType(CreateWishlistDto) {
  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  image: string;

  @IsArray()
  @IsOptional()
  itemsId: number[];
}
