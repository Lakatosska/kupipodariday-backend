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
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ReqUser } from 'src/users/users.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@ReqUser() user: User, @Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.create(user, createWishlistDto);
  }

  // работает
  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  // работает
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistsService.findOne(+id);
  }

  // работает, но возвращает странный ответ
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistsService.updateOne(+id, updateWishlistDto);
  }

  // работает
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistsService.removeOne(+id);
  }
}
