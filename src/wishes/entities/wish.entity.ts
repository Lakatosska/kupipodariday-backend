import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import {
  Length,
  IsDate,
  IsUrl,
  IsFQDN,
  IsInt,
  IsPositive,
  IsNumber,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string;

  // ссылка на интернет-магазин
  @Column()
  @IsUrl()
  link: string;

  // Должна быть валидным URL
  @Column()
  @IsUrl()
  image: string;

  // с округлением до сотых
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @IsNumber()
  price: number;

  // сумма предварительного сбора, округляется до сотых
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  raised: number;

  @Column({ default: '' })
  @Length(1, 1024)
  description: string;

  // wish.entity.ts
  // ссылка на пользователя, который добавил пожелание подарка
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  // массив ссылок на заявки скинуться от других пользователей
  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  // содержит cчётчик тех, кто скопировал подарок себе. Целое десятичное число
  @Column({ default: 0 })
  @IsInt()
  copied: number;
}
