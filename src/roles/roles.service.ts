import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from '../entities/Role';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
    private connection: Connection,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const { roleType } = createRoleDto;

    const newRole = new Role();
    newRole.roleType = roleType;

    return await this.rolesRepository.save(newRole);
  }

  async findAll() {
    return this.rolesRepository.createQueryBuilder('roles').getMany();
  }

  async findOne(id: number) {
    return this.rolesRepository
      .createQueryBuilder('roles')
      .where('roles.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { roleType } = updateRoleDto;
    const result = await this.rolesRepository.update(id, { roleType });
    if (result.affected > 0) {
      return 'ok';
    } else {
      throw new NotFoundException('해당 id를 가진 ROLE을 찾지 못했습니다.');
    }
  }

  async remove(id: number) {
    const finded = await this.rolesRepository.findOne(id);
    if (finded) {
      await this.rolesRepository.remove(finded);
      return 'success';
    } else {
      throw new NotFoundException('해당 id를 가진 ROLE을 찾지 못했습니다.');
    }
  }
}
