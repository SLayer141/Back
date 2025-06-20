import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from '../model/Product';
import { User } from '../model/User';
import 'dotenv/config';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);
const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';
const DB_DATABASE = process.env.DB_DATABASE || 'testdb';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true, // Set to false in production
  logging: false,
  entities: [Product, User],
}); 