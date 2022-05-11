import { ApiProperty } from '@nestjs/swagger';
import { CreateStaffDto } from '../../users/dto/create-staff.dto';

class StaffDto extends CreateStaffDto {
  @ApiProperty({
    required: true,
    example: 1,
    description: '아이디',
  })
  id: number;
}
