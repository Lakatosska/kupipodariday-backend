import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FindUsersDto } from './dto/find-users.dto';
import { User } from './entities/user.entity';
// import { Request } from 'express';
// import { REQUEST } from '@nestjs/core';

//@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /*
  // не нужен
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  */

  // создала, чтобы проверить. работает.
  @Get('all')
  findAllUsers() {
    return this.usersService.findAll();
  }

  // работает
  @UseGuards(JwtGuard)
  @Get('me')
  findMe(@Request() req) {
    //return this.usersService.findOneById(req.user.id);
    return req.user;
  }

  // работает только с переданными email и password
  @UseGuards(JwtGuard)
  @Patch('me')
  async updateMe(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const me = req.user.id;
    await this.usersService.updateOne(me, updateUserDto);
    return this.usersService.findOneById(me);
  }

  // работает
  @Get(':username')
  findUserByUsername(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  //работает
  @Post('find')
  findAll(@Body() findUsersDto: FindUsersDto) {
    return this.usersService.findMany(findUsersDto);
  }

  // !!! не работает
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }
  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOne(+id, updateUserDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeOne(+id);
  }
  */
}
