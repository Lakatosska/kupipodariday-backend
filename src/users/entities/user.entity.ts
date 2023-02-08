import { Offer } from 'src/offers/entities/offer.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ length: 30 })
  username: string;

  @Column({
    length: 200,
    default: 'Пока ничего не рассказал о себе',
  })
  about: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  avatar: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @Column()
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @Column()
  @OneToMany(() => Wishlist, (wishlist) => wishlist.id)
  wishlists: Wishlist[];
}
