import { Injectable } from '@nestjs/common';
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
    //const { itemId, amount, hidden } = createOfferDto;
    const wishId = await this.wishesService.findOne(createOfferDto.itemId);

    //const offer = this.offersRepository.create({ item, amount, hidden });

    return await this.offersRepository.save({
      ...createOfferDto,
      item: wishId,
      user: user,
    });
  }

  findAll() {
    return this.offersRepository.find();
  }

  findOne(id: number) {
    return this.offersRepository.findOneBy({ id });
  }

  updateOne(id: number, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  async removeOne(id: number) {
    await this.offersRepository.delete(id);
  }
}
