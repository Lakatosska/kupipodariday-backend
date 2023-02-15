import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  // сумма заявки, округляется до двух знаков после запятой
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  // флаг, который определяет показывать ли информацию о скидывающемся в списке
  @IsBoolean()
  hidden: boolean;
}
