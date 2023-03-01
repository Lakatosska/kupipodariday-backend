import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { Wish } from './entities/wish.entity';

@Module({
  controllers: [WishesController],
  providers: [WishesService],
  imports: [TypeOrmModule.forFeature([Wish])],
  exports: [WishesService],
})
export class WishesModule {}
