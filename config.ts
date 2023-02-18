export default () => ({
  port: 3000,
  db: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'kupipodariday',
    username: 'student',
    password: 'student',
  },
  jwt_secret: 'jwt_secret',
});
/*
PORT = [порт сервера]
DATABASE_HOST = [хост базы данных]
DATABASE_PORT = [порт базы данных]
DATABASE_NAME = [имя базы данных]
DATABASE_TYPE = [тип базы данных]
DATABASE_USERNAME = [имя пользователя базы данных]
DATABASE_PASSWORD = [пароль пользователя базы данных]
SALT = [значение `saltOrRounds` для bcrypt]
JWT_SECRET = [значение секрета jwt]
*/
