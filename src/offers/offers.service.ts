import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    private wishesService: WishesService,
  ) {}

  async create(user: User, createOfferDto: CreateOfferDto) {
    // const { itemId, amount, hidden } = createOfferDto;
    const wish = await this.wishesService.findOne(createOfferDto.itemId);

    //const offer = this.offersRepository.create({ item, amount, hidden });

    if (user.id === wish.owner.id) {
      throw new BadRequestException(
        'Можно вносить деньги только на подарки для других',
      );
    } else if (createOfferDto.amount > wish.price - wish.raised) {
      throw new BadRequestException(
        'Сумма вносимых средств не может превышать стоимость подарка',
      );
    }

    await this.wishesService.updateRaisedAmount(
      wish.id,
      wish.raised + createOfferDto.amount,
    );

    const updatedWish = await this.wishesService.findOne(wish.id);

    return await this.offersRepository.save({
      ...createOfferDto,
      item: updatedWish,
      user,
    });
  }

  findAll() {
    return this.offersRepository.find();
  }

  findOne(id: number) {
    return this.offersRepository.findOneBy({ id });
  }
}
