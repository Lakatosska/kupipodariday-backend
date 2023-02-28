import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
    private wishesService: WishesService,
  ) {}

  async create(user: User, createOfferDto: CreateOfferDto) {
    const { itemId, amount, hidden } = createOfferDto;
    const wish = await this.wishesService.getWishById(itemId);

    if (user.id === wish.owner.id) {
      throw new BadRequestException(
        'Можно вносить деньги только на подарки для других',
      );
    } else if (amount + wish.raised > wish.price) {
      throw new BadRequestException(
        'Сумма вносимых средств не может превышать стоимость подарка',
      );
    }

    const newOffer = await this.offersRepository.create({
      amount,
      hidden,
      item: wish,
      user,
    });

    await this.wishesService.updateRaisedAmount(wish, amount);

    await this.offersRepository.save(newOffer);
    return newOffer;
  }

  findAll() {
    return this.offersRepository.find();
  }

  findOne(id: number) {
    return this.offersRepository.findOneBy({ id });
  }
}
