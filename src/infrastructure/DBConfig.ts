require('dotenv').config();

export const PGClientConfig = {
  user: process.env.USER_NAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: Number(process.env.PORT),
};
