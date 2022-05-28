import { Module } from '@nestjs/common';
import { ParticipationsService } from './participations.service';
import { ParticipationsController } from './participations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participation } from '../entities/Participation';

@Module({
  controllers: [ParticipationsController],
  providers: [ParticipationsService],
  imports: [TypeOrmModule.forFeature([Participation])],
  exports: [ParticipationsService],
})
export class ParticipationsModule {}
