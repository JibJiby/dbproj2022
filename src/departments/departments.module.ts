import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../entities/Department';

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  imports: [TypeOrmModule.forFeature([Department])],
})
export class DepartmentsModule {}
