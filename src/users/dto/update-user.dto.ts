import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-staff.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
