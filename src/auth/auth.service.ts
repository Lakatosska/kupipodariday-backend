import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

// для идентификации пользователя
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  // тут будем генерировать токен
  auth(user: User) {
    const payload = { sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }

  // проверяет, совпадает ли пароль пользователя с тем, что есть в базе
  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);

    /* В идеальном случае пароль обязательно должен быть захэширован */
    //if (user && user.password === password) {
    if (user && (await bcrypt.compare(password, user.password))) {
      /* Исключаем пароль из результата */
      //const { password, ...result } = user;

      // или тут return user?
      //return result;
      return user;
    }

    return null;
  }
}
