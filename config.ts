export default () => ({
  port: 3001,
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
