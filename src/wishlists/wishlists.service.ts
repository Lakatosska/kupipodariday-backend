import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistsRepository: Repository<Wishlist>,
  ) {}

  async create(createWishlistDto: CreateWishlistDto) {
    const wishlist = this.wishlistsRepository.create(createWishlistDto);
    return await this.wishlistsRepository.save(wishlist);
  }

  findAll() {
    return this.wishlistsRepository.find();
  }

  findOne(id: number) {
    return this.wishlistsRepository.findOneBy({ id });
  }

  async updateOne(id: number, updateWishlistDto: UpdateWishlistDto) {
    return await this.wishlistsRepository.update({ id }, updateWishlistDto);
  }

  async removeOne(id: number) {
    await this.wishlistsRepository.delete(id);
  }
}
