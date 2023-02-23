import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsString,
  IsEmail,
  Length,
  IsOptional,
  MinLength,
  IsUrl,
  IsNotEmpty,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @Length(1, 64)
  @IsNotEmpty()
  @IsOptional()
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
  @IsOptional()
  email: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  @IsOptional()
  password: string;
}
