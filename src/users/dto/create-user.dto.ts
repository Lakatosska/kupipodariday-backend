import {
  IsString,
  IsEmail,
  Length,
  IsOptional,
  MinLength,
  IsUrl,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 64)
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  @Length(0, 200)
  about: string;

  @IsUrl()
  @IsOptional()
  avatar: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  password: string;
}
