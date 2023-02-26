import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FindUsersDto } from './dto/find-users.dto';
import { User } from './entities/user.entity';
import { ReqUser } from './users.decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findMe(@ReqUser() user: User) {
    return user;
  }

  @Patch('me')
  async updateProfile(
    @ReqUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateOne(user.id, updateUserDto);
  }

  @Get(':username')
  findUserByUsername(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @Post('find')
  findAll(@Body() findUsersDto: FindUsersDto) {
    return this.usersService.findMany(findUsersDto);
  }

  @Get('me/wishes')
  getProfileWishes(@ReqUser() user: User) {
    return this.usersService.getUserWishesById(user.id);
  }

  @Get(':username/wishes')
  getUserWishesByUsername(@Param('username') username: string) {
    return this.usersService.getUserWishesByUsername(username);
  }
}
