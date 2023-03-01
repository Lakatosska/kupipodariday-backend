import { PartialType } from '@nestjs/swagger';
import { CreateWishDto } from './create-wish.dto';
import {
  IsString,
  Length,
  IsUrl,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class UpdateWishDto extends PartialType(CreateWishDto) {
  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  link: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  image: string;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  @IsOptional()
  price: number;

  @IsString()
  @Length(1, 1024)
  @IsOptional()
  description: string;

  @IsOptional()
  @IsNumber()
  copied: number;

  @IsOptional()
  @IsNumber()
  raised: number;
}
