import { IsDate, IsUrl, Length, MaxLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Wishlist {
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

  // описание подборки, строка до 1500 символов
  @Column()
  @MaxLength(1500)
  description: string;

  // обложка для подборки
  @Column()
  @IsUrl()
  image: string;

  // колонка есть только в сваггере
  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  // содержит набор ссылок на подарки
  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];
}
