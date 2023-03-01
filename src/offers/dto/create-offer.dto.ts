import { IsBoolean, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  // сумма заявки, округляется до двух знаков после запятой
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  // флаг, который определяет показывать ли информацию о скидывающемся в списке
  @IsBoolean()
  hidden: boolean;
}
