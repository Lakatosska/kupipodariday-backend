import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

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
    });
    return await this.wishesRepository.save(wish);
  }

  findAll() {
    return this.wishesRepository.find();
  }

  findOne(id: number) {
    return this.wishesRepository.findOneBy({ id });
  }

  // проверка, что юзер редактирует свой виш
  // может отредактировать описание подарка и стоимость, если никто не скинулся
  async updateOne(id: number, updateWishDto: UpdateWishDto) {
    return await this.wishesRepository.update({ id }, updateWishDto);
  }

  async removeOne(id: number) {
    await this.wishesRepository.delete(id);
  }
}
