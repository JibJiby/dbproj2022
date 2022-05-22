import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Staff } from '../entities/Staff';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Staff) private staffsRepository: Repository<Staff>,
  ) {}

  async validateUser(email: string, password: string) {
    const staff = await this.staffsRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
    console.log(email, password, staff);
    if (!staff) {
      return null;
    }
    const result = await bcrypt.compare(password, staff.password);
    if (result) {
      const { password, ...staffWithoutPassword } = staff;
      return staffWithoutPassword;
    }
    return null;
  }
}
