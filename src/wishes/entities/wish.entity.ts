import { Offer } from 'src/offers/entities/offer.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Length, IsDate, IsUrl, IsFQDN, IsInt } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string;

  // ссылка на интернет-магазин
  @Column()
  // @IsUrl()
  @IsFQDN()
  link: string;

  // Должна быть валидным URL
  @Column()
  @IsUrl()
  image: string;

  // с округлением до сотых
  @Column()
  price: number;

  // сумма предварительного сбора, округляется до сотых
  @Column()
  raised: number;

  @Column()
  @Length(1, 1024)
  description: string;

  // ссылка на пользователя, который добавил пожелание подарка
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  // массив ссылок на заявки скинуться от других пользователей
  @ManyToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  // содержит cчётчик тех, кто скопировал подарок себе. Целое десятичное число
  @Column()
  @IsInt()
  copied: number;
}
