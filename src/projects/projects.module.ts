import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../entities/Project';
import { Client } from '../entities/Client';
import { Participation } from '../entities/Participation';
import { Staff } from '../entities/Staff';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [TypeOrmModule.forFeature([Project, Client, Participation, Staff])],
  exports: [ProjectsService],
})
export class ProjectsModule {}
