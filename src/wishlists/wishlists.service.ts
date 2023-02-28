import { BadRequestException, Injectable } from '@nestjs/common';
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
    private readonly wishlistsRepository: Repository<Wishlist>,
  ) {}
  /*
  async create(user: User, createWishlistDto: CreateWishlistDto) {
    const { name, description, image, itemsId } = createWishlistDto;
    const items = itemsId.map((id) => ({ id } as Wish));
    const wishlist = this.wishlistsRepository.create({
      name,
      description,
      image,
      items,
      owner: user,
    });
    return await this.wishlistsRepository.save(wishlist);
  }
*/
  async create(createWishlistDto: CreateWishlistDto, ownerId: number) {
    const { name, description, image, itemsId } = createWishlistDto;
    const items = itemsId.map((id) => ({ id } as Wish));
    const wishlist = this.wishlistsRepository.create({
      name,
      description,
      image,
      items,
      owner: { id: ownerId },
    });
    return await this.wishlistsRepository.save(wishlist);
  }

  findAll() {
    return this.wishlistsRepository.find({ relations: ['items', 'owner'] });
  }

  findOneById(id: number) {
    return this.wishlistsRepository.findOne({
      where: { id },
      relations: ['items', 'owner'],
    });
  }

  findOne(query) {
    return this.wishlistsRepository.findOne(query);
  }

  async updateOne(
    id: number,
    userId: number,
    updateWishlistDto: UpdateWishlistDto,
  ) {
    const wishlist = await this.findOne({
      where: { id },
      relations: { owner: true },
    });

    if (wishlist.owner.id !== userId) {
      throw new BadRequestException(
        'Можно редактировать только свои списки подарков',
      );
    }

    return await this.wishlistsRepository.update(id, updateWishlistDto);
  }

  async removeOne(id: number, userId: number) {
    const wishlist = await this.findOne({
      where: { id },
      relations: { owner: true },
    });

    if (wishlist.owner.id !== userId) {
      throw new BadRequestException(
        'Вы можете удалять только свои списки подарков',
      );
    }
    await this.wishlistsRepository.delete(id);
  }
}
