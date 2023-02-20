import { Injectable } from '@nestjs/common';
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
    private usersRepository: Repository<User>,
  ) {}

  // надо еще хешировать пароль
  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    //const { username, about, email, avatar, password } = createUserDto;
    const user = await this.usersRepository.create({
      ...createUserDto,
      password: hash,
    });
    return this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOneById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async findOneByUsername(username: string) {
    return await this.usersRepository.findOneBy({ username });
  }

  async findMany(findUsersDto: FindUsersDto) {
    const { query } = findUsersDto;
    return await this.usersRepository.find({
      where: [{ email: query }, { username: query }],
    });
  }

  // не должен в ответе приходить пароль
  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    const hash = await bcrypt.hash(updateUserDto.password, 10);

    if (updateUserDto.password) {
      return await this.usersRepository.update(id, {
        ...updateUserDto,
        password: hash,
      });
    }
    return await this.usersRepository.update(id, updateUserDto);
  }

  async removeOne(id: number) {
    await this.usersRepository.delete({ id });
  }
}
