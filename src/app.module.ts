import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  // объект с настройками подключения
  // опции TypeORM
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'kupipodariday',
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

/*
Сгенерируйте каркас API
Добавьте модуль, контроллер и сервис для всех основных компонентов и сущностный будущего проекта:
Пользователи (users)
Подарки (wishes)
Списки желаний (wishlists)
Предложения скинуться на подарок (offers).
Для этого воспользуйтесь Nest CLI.
*/
