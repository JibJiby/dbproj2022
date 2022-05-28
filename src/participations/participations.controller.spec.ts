import { Test, TestingModule } from '@nestjs/testing';
import { ParticipationsController } from './participations.controller';
import { ParticipationsService } from './participations.service';

describe('ParticipationsController', () => {
  let controller: ParticipationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipationsController],
      providers: [ParticipationsService],
    }).compile();

    controller = module.get<ParticipationsController>(ParticipationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
