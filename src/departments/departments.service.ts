import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/Department';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const { depName } = createDepartmentDto;

    const newDepName = new Department();
    newDepName.depName = depName;

    return await this.departmentsRepository.save(newDepName);
  }

  async findAll() {
    return await this.departmentsRepository.find();
  }

  async findOne(id: number) {
    return this.departmentsRepository
      .createQueryBuilder('departments')
      .where('departments.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const { depName } = updateDepartmentDto;
    const result = await this.departmentsRepository.update(id, { depName });
    if (result.affected > 0) {
      return 'ok';
    } else {
      throw new NotFoundException('해당 id를 가진 부서을 찾지 못했습니다.');
    }
  }

  async remove(id: number) {
    const finded = await this.departmentsRepository.findOne(id);
    if (finded) {
      await this.departmentsRepository.remove(finded);
      return 'success';
    } else {
      throw new NotFoundException('해당 id를 가진 부서을 찾지 못했습니다.');
    }
  }
}
