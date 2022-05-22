import { PickType } from '@nestjs/swagger';
import { Staff } from '../../entities/Staff';

export class LoginStaffDto extends PickType(Staff, [
  'email',
  'password',
] as const) {}
