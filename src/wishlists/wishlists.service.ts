import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async create(id: number, createWishlistDto: CreateWishlistDto) {
    const { name, description, image, itemsId } = createWishlistDto;
    const items = itemsId.map((id) => ({ id } as Wish));
    const wishlist = this.wishlistsRepository.create({
      name,
      description,
      image,
      items,
      owner: { id },
    });
    return await this.wishlistsRepository.save(wishlist);
  }

  findAll() {
    return this.wishlistsRepository.find({
      relations: {
        owner: true,
        items: true,
      },
    });
  }

  findOneById(id: number) {
    return this.wishlistsRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        items: true,
      },
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

    if (userId !== wishlist.owner.id) {
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

    if (userId !== wishlist.owner.id) {
      throw new BadRequestException(
        'Вы можете удалять только свои списки подарков',
      );
    }
    await this.wishlistsRepository.delete(id);
  }
}
