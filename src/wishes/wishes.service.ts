import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { ReqUser } from 'src/users/users.decorator';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) {}

  // передаем юзера, чтобы заполнить поле ownerId в таблице
  async create(user: User, createWishDto: CreateWishDto) {
    const { name, link, image, price, description } = createWishDto;
    const wish = this.wishesRepository.create({
      name,
      link,
      image,
      price,
      description,
      owner: user,
      offers: [],
    });
    return await this.wishesRepository.save(wish);
  }

  //Добавлено 24.02.2023 пользователем undefined ↗
  // findOne(id: number) {
  //   return this.wishesRepository.findOneBy({ id });
  // }

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

  updateRaisedAmount(id: number, raised: number) {
    return this.wishesRepository.update(id, { raised });
  }
}
