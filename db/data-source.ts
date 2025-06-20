import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from '../model/Product';
import { User } from '../model/User';
import 'dotenv/config';

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL, // Use Railway-provided DATABASE_URL
  synchronize: true, // Set to false in production
  logging: false,
  entities: [Product, User],
  ssl: isProduction ? { rejectUnauthorized: false } : false, // Enable SSL in production
}); 