import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { ReqUser } from 'src/users/users.decorator';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}

  // передаем юзера, чтобы заполнить поле ownerId в таблице
  async create(user: User, createWishDto: CreateWishDto) {
    const { name, link, image, price, description, raised } = createWishDto;
    const wish = this.wishesRepository.create({
      name,
      link,
      image,
      price,
      description,
      raised: 0,
      owner: user,
      // offers: [],
    });
    return await this.wishesRepository.save(wish);
  }

  // !! прописать ошибку
  // проверка, что юзер редактирует свой виш
  // может отредактировать описание подарка и стоимость, если никто не скинулся
  async updateOne(id: number, updateWishDto: UpdateWishDto) {
    const wish = await this.wishesRepository.findOneBy({ id });
    if (wish.raised > 0) {
      throw new BadRequestException(
        'Вы можете редактировать подарки, на которые еще никто не скинулся',
      );
    }
    return await this.wishesRepository.update(wish, updateWishDto);
  }

  async removeOne(id: number) {
    await this.wishesRepository.delete(id);
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  async findOne(id: number) {
    return await this.wishesRepository.findOne({
      relations: {
        owner: { wishes: true, wishlists: true, offers: true },
        offers: { user: true },
      },
      where: { id },
    });
  }

  // findOne(query) {
  //   return this.wishesRepository.findOne(query);
  // }
  /*
  async copyWish(user: User, id: number) {
    const wish = await this.findOne(id);

    await this.wishesRepository.update({ id }, { copied: wish.copied + 1 });

    const { name, link, image, price, description } = wish;

    return await this.wishesRepository.create({
      name,
      link,
      image,
      price,
      description,
      owner: user,
    });
  }
*/
  async copyWish(id: number, user: User): Promise<object> {
    const wish = await this.findOne(id);
    if (wish.owner.id !== user.id) {
      const copied = wish.copied + 1;
      await this.wishesRepository.update(id, { copied });
      const { name, link, image, price, description, raised } = wish;
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

  // updateRaisedAmount(id: number, raised: number) {
  //   return this.wishesRepository.update(id, { raised });
  // }

  updateRaisedAmount(wish: Wish, amount: number) {
    return this.wishesRepository.update(
      { id: wish.id },
      { raised: wish.raised + amount },
    );
  }

  async getWishById(wishId: number) {
    const wish = await this.wishesRepository.findOne({
      where: { id: wishId },
      relations: ['owner', 'offers'],
    });
    return wish;
  }
}
