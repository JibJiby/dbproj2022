import { PickType } from '@nestjs/swagger';
import { Client } from '../../entities/Client';

export class CreateClientDto extends PickType(Client, [
  'clientName',
  'companyName',
] as const) {}
