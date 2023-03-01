import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { ForbiddenException } from '@nestjs/common/exceptions';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}

  // передаем юзера, чтобы заполнить поле ownerId в таблице
  async create(id: number, createWishDto: CreateWishDto) {
    const { name, link, image, price, description } = createWishDto;
    const wish = this.wishesRepository.create({
      name,
      link,
      image,
      price,
      description,
      raised: 0,
      owner: { id },
      offers: [],
    });
    return await this.wishesRepository.save(wish);
  }

  async findWish(id: number) {
    return await this.wishesRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        offers: { user: true },
      },
    });
  }

  async updateOne(
    wishId: number,
    updateWishDto: UpdateWishDto,
    userId: number,
  ) {
    const wish = await this.findWish(wishId);
    if (userId !== wish.owner.id) {
      throw new ForbiddenException('Можно редактировать только свои подарки');
    }
    if (wish.raised > 0) {
      throw new BadRequestException(
        'Вы не можете редактировать этот подарок. Идет сбор.',
      );
    }
    return await this.wishesRepository.update(wish, updateWishDto);
  }

  async removeOne(wishId: number) {
    await this.wishesRepository.delete(wishId);
  }

  async copyWish(id: number, user: User) {
    const wish = await this.findWish(id);
    await this.wishesRepository.update(id, { copied: wish.copied + 1 });
    const { name, link, image, price, description } = wish;
    const copiedWish = await this.wishesRepository.create({
      name,
      link,
      image,
      price,
      description,
      raised: 0,
      owner: user,
    });
    return await this.wishesRepository.save(copiedWish);
  }

  getTopWishes() {
    return this.wishesRepository.find({
      order: {
        copied: 'DESC',
      },
      take: 10,
    });
  }

  getLastWishes() {
    return this.wishesRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
  }

  updateRaisedAmount(wish: Wish, amount: number) {
    return this.wishesRepository.update(
      { id: wish.id },
      { raised: wish.raised + amount },
    );
  }
}
