import { PickType } from '@nestjs/swagger';
import { Department } from '../../entities/Department';

export class CreateDepartmentDto extends PickType(Department, [
  'depName',
] as const) {}
