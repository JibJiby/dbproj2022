import { PickType } from '@nestjs/swagger';
import { Role } from '../../entities/Role';

export class CreateRoleDto extends PickType(Role, ['roleType'] as const) {}
