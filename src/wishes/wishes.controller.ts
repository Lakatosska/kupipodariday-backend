import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ReqUser } from '../users/users.decorator';
import { User } from '../users/entities/user.entity';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@ReqUser() user: User, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(user.id, createWishDto);
  }

  @Get('last')
  findLast() {
    return this.wishesService.getLastWishes();
  }

  @Get('top')
  findTop() {
    return this.wishesService.getTopWishes();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findWish(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @ReqUser() user: User,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    return await this.wishesService.updateOne(+id, updateWishDto, user.id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishesService.removeOne(+id);
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copy(@ReqUser() user: User, @Param('id') id: string) {
    return this.wishesService.copyWish(+id, user);
  }
}
