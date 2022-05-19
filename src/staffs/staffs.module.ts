import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from '../entities/Staff';

@Module({
  controllers: [StaffsController],
  providers: [StaffsService],
  imports: [TypeOrmModule.forFeature([Staff])],
})
export class StaffsModule {}
