import { IsUrl, Length, MaxLength } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';
import { DefaultEntity } from '../../common/entity/default.entity';

@Entity()
export class Wishlist extends DefaultEntity {
  @Column()
  @Length(1, 250)
  name: string;

  // описание подборки, строка до 1500 символов
  @Column({ default: '' })
  @MaxLength(1500)
  description: string;

  // обложка для подборки
  @Column()
  @IsUrl()
  image: string;

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  // содержит набор ссылок на подарки
  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];
}
