import { PickType, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Staff } from '../../entities/Staff';

export class CreateStaffDto extends PickType(Staff, [
  'email',
  'name',
  'password',
] as const) {
  @IsEmail()
  @ApiProperty({
    example: 'aaa@aaa.com',
    description: '이메일',
  })
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '홍길동',
    description: '이름',
  })
  public name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password123',
    description: '비밀번호',
  })
  public password: string;
}
