import { IsDate, Length, MaxLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wish } from 'src/wishes/entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

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

  // Не может быть длиннее 250 символов и короче одного
  @Column()
  @Length(1, 250)
  name: string;

  // описание подборки, строка до 1500 символов
  @Column()
  @MaxLength(1500)
  description: string;

  // обложка для подборки
  @Column()
  image: string;

  // колонка есть только в сваггере
  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  // содержит набор ссылок на подарки
  @ManyToMany(() => Wish, (wish) => wish.id)
  items: Wish[];
}
