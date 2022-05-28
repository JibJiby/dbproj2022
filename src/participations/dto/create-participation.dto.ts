import { PickType } from '@nestjs/swagger';
import { Participation } from '../../entities/Participation';

export class CreateParticipationDto extends PickType(Participation, [
  'participationStartDate',
  'participationEndDate',
  'Staff',
  'Project',
] as const) {}
