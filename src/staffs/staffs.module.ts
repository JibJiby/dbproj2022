import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from '../entities/Staff';

@Module({
  controllers: [StaffsController],
  providers: [StaffsService],
  imports: [TypeOrmModule.forFeature([Staff])],
  // app module에서 사용.
  // 참고 : https://stackoverflow.com/questions/51819504/inject-nestjs-service-from-another-module
  exports: [StaffsService],
})
export class StaffsModule {}
