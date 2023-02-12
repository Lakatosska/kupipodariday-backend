import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // надо еще хешировать пароль
  async create(createUserDto: CreateUserDto) {
    const { username, about, email, avatar, password } = createUserDto;
    const user = this.usersRepository.create({
      username,
      about,
      email,
      avatar,
      password,
    });
    return await this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  // + надо написать условие хеширования пароля, если будет его update
  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update({ id }, updateUserDto);
  }

  async removeOne(id: number) {
    await this.usersRepository.delete(id);
  }
}
