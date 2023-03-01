import { Entity, Column, ManyToOne } from 'typeorm';
import { IsPositive } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { DefaultEntity } from '../../common/entity/default.entity';

@Entity()
export class Offer extends DefaultEntity {
  // содержит id желающего скинуться
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  // содержит ссылку на товар
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  // сумма заявки, округляется до двух знаков после запятой
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  @IsPositive()
  amount: number;

  // флаг, который определяет показывать ли информацию о скидывающемся в списке
  @Column({ default: false })
  hidden: boolean;
}
