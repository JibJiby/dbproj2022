import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/Project';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectsRepository: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return 'This action adds a new project';
  }

  async findAll() {
    const result = await this.projectsRepository
      .createQueryBuilder('projects')
      .leftJoinAndSelect('projects.Client', 'clients')
      .getMany();

    return result;
  }

  async findNoneClientProject() {
    const result = await this.projectsRepository
      .createQueryBuilder('projects')
      // .where('projects.Client is null')
      .getMany();
    return result;
  }

  async findOne(id: number) {
    return this.projectsRepository
      .createQueryBuilder('projects')
      .where('projects.id = :id', { id })
      .leftJoinAndSelect('projects.Client', 'clients')
      .getOne();
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
