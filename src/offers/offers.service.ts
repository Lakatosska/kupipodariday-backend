import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
  ) {}

  /*
  async create(createOfferDto: CreateOfferDto) {
    const { itemId, amount, hidden } = createOfferDto;
    const offer = this.offersRepository.create({ itemId, amount, hidden });
    return await this.offersRepository.save(offer);
  }
  */

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
