import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  Length,
  IsNotEmpty,
  IsDate,
  IsOptional,
  IsEmail,
  IsUrl,
} from 'class-validator';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;

  // содержит id желающего скинуться
  @Column()
  //user: User;
  user: string;

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
