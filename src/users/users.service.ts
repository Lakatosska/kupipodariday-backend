import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { FindUsersDto } from './dto/find-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.usersRepository.create({
      ...createUserDto,
      password: hash,
    });
    const user = await this.usersRepository.save(newUser);
    delete user.password;
    return user;
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(query) {
    return await this.usersRepository.findOne(query);
  }

  async findOneById(id: number) {
    const user = this.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('такой пользователь не существует');
    }
    return user;
  }

  async findOneByUsername(username: string) {
    const user = this.findOne({
      where: { username },
    });
    if (!user) {
      throw new NotFoundException('такой пользователь не существует');
    }
    return user;
  }

  async findMany(findUsersDto: FindUsersDto) {
    const { query } = findUsersDto;
    return await this.usersRepository.find({
      where: [{ email: query }, { username: query }],
    });
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hash = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto = { ...updateUserDto, password: hash };
    }
    await this.usersRepository.update(id, updateUserDto);
    return this.findOneById(id);
  }

  async removeOne(id: number) {
    await this.usersRepository.delete({ id });
  }

  async getUserWishesByUsername(username: string) {
    const user = await this.findOne({
      where: { username },
      relations: {
        wishes: { owner: true, offers: true },
      },
    });

    return user.wishes;
  }

  async getUserWishesById(id: number) {
    const user = await this.findOne({
      where: { id },
      relations: {
        wishes: { owner: true, offers: true },
      },
    });
    return user.wishes;
  }
}
