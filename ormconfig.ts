import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { Client } from './src/entities/Client';
import { Department } from './src/entities/Department';
import { Participation } from './src/entities/Participation';
import { Project } from './src/entities/Project';
import { Role } from './src/entities/Role';
import { Staff } from './src/entities/Staff';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Client, Department, Participation, Project, Role, Staff],
  // migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV !== 'production',
  keepConnectionAlive: true,
};

export = config;
