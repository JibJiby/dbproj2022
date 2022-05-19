import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from '../entities/Staff';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staff) private staffsRepository: Repository<Staff>, // private connection: Connection,
  ) {}

  create(createStaffDto: CreateStaffDto) {
    return 'This action adds a new staff';
  }

  findAll() {
    return `This action returns all staffs`;
  }

  async findByName(name: string) {
    const result = await this.staffsRepository
      .createQueryBuilder('staffs')
      .where('staffs.name = :name', { name })
      .getMany();
    if (result) {
      return result;
    } else {
      throw new NotFoundException('해당 name를 가진 STAFF를 찾지 못했습니다.');
    }
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return `This action updates a #${id} staff`;
  }

  remove(id: number) {
    return `This action removes a #${id} staff`;
  }
}
