# КупиПодариДай / BuyGiftGive

Backend development of service of wishlists for given [frontend](https://github.com/yandex-praktikum/kupipodariday-frontend/).
Authorized users could edit profile, create wishlists, add desirable wishes and dob in to buy a wish for other users. 
Non-authorized users could see the feed of last wishes and popular ones (gifts for which funds are in process of being raised)

## Technologies used
TypeScript
NestJS
PostgreSQL
TypeORM
Passport.js

## Database (PostgreSQL)
CREATE USER student WITH PASSWORD 'student';
CREATE DATABASE kupipodariday;
GRANT ALL PRIVILEGES ON DATABASE kupipodariday TO student;
