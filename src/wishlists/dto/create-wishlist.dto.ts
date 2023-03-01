import {
  IsString,
  Length,
  IsUrl,
  IsNotEmpty,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
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
