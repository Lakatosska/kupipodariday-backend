import { Wish } from 'src/wishes/entities/wish.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  // Не может быть длиннее 250 символов и короче одного
  @Column({ length: 250 })
  name: string;

  @Column({ length: 1500 })
  description: string;

  // обложка для подборки
  @Column()
  image: string;

  // ?? содержит набор ссылок на подарки
  /*
  @Column()
  items: Wish[];
  */
}
