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

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    // return this.userRepository.find((user) => user.id === id)
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const { username, about, email, avatar, password } = updateUserDto;
    const user = this.usersRepository.update()
    //return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }
}
