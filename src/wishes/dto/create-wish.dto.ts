import {
  IsString,
  Length,
  IsUrl,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateWishDto {
  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  price: number;

  @IsString()
  @Length(1, 1024)
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  raised: number;
}
