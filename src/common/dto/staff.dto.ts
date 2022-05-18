import { ApiProperty } from '@nestjs/swagger';
import { CreateStaffDto } from '../../staffs/dto/create-staff.dto';

class StaffDto extends CreateStaffDto {
  @ApiProperty({
    required: true,
    example: 1,
    description: '아이디',
  })
  id: number;
}
