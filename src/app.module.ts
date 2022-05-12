import path from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../ormconfig';
import { Client } from './entities/Client';
import { Department } from './entities/Department';
import { Participation } from './entities/Participation';
import { Project } from './entities/Project';
import { Role } from './entities/Role';
import { Staff } from './entities/Staff';
import { StaffsModule } from './staffs/staffs.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    // 새로운 엔티티 추가할 때마다 2곳에 추가. (1. forRoot의 ormconfig + 2. forFeature)
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([
      Client,
      Department,
      Participation,
      Project,
      Role,
      Staff,
    ]),
    StaffsModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
