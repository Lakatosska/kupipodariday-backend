import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  // содержит id желающего скинуться
  @Column()
  user: User;

  // содержит ссылку на товар
  @Column()
  item: string;

  // сумма заявки, округляется до двух знаков после запятой
  @Column()
  amount: number;

  // флаг, который определяет показывать ли информацию о скидывающемся в списке
  @Column({ default: false })
  hidden: boolean;
}
