import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from '../entities/Staff';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staff) private staffsRepository: Repository<Staff>,
  ) {}

  create(createStaffDto: CreateStaffDto) {
    // login 페이지에서 POST 메소드 추가하기
    return 'This action adds a new staff';
  }

  async findAll() {
    const result = await this.staffsRepository
      .createQueryBuilder('staffs')
      .leftJoinAndSelect('staffs.Department', 'departments')
      .getMany();

    return result;
  }

  async findByName(name: string) {
    const result = await this.staffsRepository
      .createQueryBuilder('staffs')
      .where('staffs.name = :name', { name })
      .leftJoinAndSelect('staffs.Department', 'departments')
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
