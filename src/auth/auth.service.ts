import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

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
    const user = await this.usersService.findByUsername(username);

    /* В идеальном случае пароль обязательно должен быть захэширован */
    if (user && user.password === password) {
      /* Исключаем пароль из результата */
      const { password, ...result } = user;

      // или тут return user?
      return result;
    }

    return null;
  }
}
