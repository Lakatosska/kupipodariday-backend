import { IsString, IsNotEmpty } from 'class-validator';

export class FindUsersDto {
  @IsString()
  @IsNotEmpty()
  query: string;
}
