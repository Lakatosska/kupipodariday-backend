import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Length, IsUrl, IsPositive, IsNumber } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { DefaultEntity } from '../../common/entity/default.entity';

@Entity()
export class Wish extends DefaultEntity {
  @Column()
  @Length(1, 250)
  name: string;

  // ссылка на интернет-магазин
  @Column()
  @IsUrl()
  link: string;

  // Должен быть валидный URL
  @Column()
  @IsUrl()
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @IsNumber()
  price: number;

  // сумма предварительного сбора
  @Column({ nullable: true })
  @IsNumber()
  raised: number;

  @Column({ default: '' })
  @Length(1, 1024)
  description: string;

  // ссылка на пользователя, который добавил пожелание подарка
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  // массив ссылок на заявки скинуться от других пользователей
  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  // содержит cчётчик тех, кто скопировал подарок себе. Целое десятичное число
  @Column({ default: 0 })
  @IsPositive()
  copied: number;
}
