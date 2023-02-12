import {
  IsString,
  Length,
  IsUrl,
  IsNotEmpty,
  IsFQDN,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateWishDto {
  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsFQDN()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  image: string;

  // с округлением до сотых
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  price: number;

  @IsString()
  @Length(1, 1024)
  @IsNotEmpty()
  description: string;
}
