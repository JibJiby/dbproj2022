import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';

@Module({
  controllers: [StaffsController],
  providers: [StaffsService]
})
export class StaffsModule {}
