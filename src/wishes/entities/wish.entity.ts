import { Offer } from 'src/offers/entities/offer.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  // Не может быть длиннее 250 символов и короче одного
  @Column({ length: 250 })
  name: string;

  // ссылка на интернет-магазин
  @Column()
  link: string;

  // Должна быть валидным URL
  @Column()
  image: string;

  // с округлением до сотых
  @Column()
  price: number;

  // сумма предварительного сбора, округляется до сотых
  @Column()
  raised: number;

  // ссылка на пользователя, который добавил пожелание подарка
  @Column()
  owner: number;

  // длиной от 1 и до 1024 символов
  @Column({ length: 1024 })
  description: string;

  // массив ссылок на заявки скинуться от других пользователей
  // какая связь?
  @Column()
  offers: Offer[];

  // содержит cчётчик тех, кто скопировал подарок себе. Целое десятичное число
  @Column()
  copied: number;
}
