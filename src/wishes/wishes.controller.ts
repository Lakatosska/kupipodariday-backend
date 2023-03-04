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
  async create(@ReqUser() user: User, @Body() createWishDto: CreateWishDto) {
    await this.wishesService.create(user.id, createWishDto);
    return {};
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
    await this.wishesService.updateOne(+id, updateWishDto, user.id);
    return {};
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@ReqUser() user: User, @Param('id') id: string) {
    return this.wishesService.removeOne(+id, user.id);
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copy(@ReqUser() user: User, @Param('id') id: string) {
    this.wishesService.copyWish(+id, user);
    return {};
  }
}
