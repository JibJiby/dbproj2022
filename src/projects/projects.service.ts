import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participation } from '../entities/Participation';
import { Client } from '../entities/Client';
import { Project } from '../entities/Project';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Staff } from '../entities/Staff';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectsRepository: Repository<Project>,
    @InjectRepository(Client) private clientsRepository: Repository<Client>,
    @InjectRepository(Staff) private staffsRepository: Repository<Staff>,
    @InjectRepository(Participation)
    private participationsRepository: Repository<Participation>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return 'This action adds a new project';
  }

  async registerProject(projectInfo: {
    projectName: string;
    projectStartDate: Date;
    projectEndDate: Date;
    participationsNumber: string;
    participationsInfo: { staffId: number; startDate: Date; endDate: Date }[];
    clientId: string;
  }) {
    // {
    //   projectName: 'aaaa',
    //   projectStartDate: '2022-05-29',
    //   projectEndDate: '2022-05-29',
    //   participationsNumber: '1',
    //   participationsInfo: [ { staffId: '5', startDate: '2022-05-29', endDate: '2022-05-29' } ],
    //   clientId: '4'
    // }

    console.log(projectInfo);
    // 프로젝트 추가 -> 참가자 추가

    //프로젝트 추가
    const newProject = new Project();
    newProject.projectName = projectInfo.projectName;
    newProject.startDate = projectInfo.projectStartDate;
    newProject.endDate = projectInfo.projectEndDate;

    newProject.Client = await this.clientsRepository.findOne(
      projectInfo.clientId,
    );
    newProject.isCompleted = false;
    newProject.budget = 1000 * 10000;

    const newProjectResult = await this.projectsRepository.save(newProject);
    // const newProjectId = newProjectResult.id;

    // // 참가자 추가
    for await (const part of projectInfo.participationsInfo) {
      // this.participationsRepository.findOne(part.staffId);
      const newParticipation = new Participation();
      newParticipation.participationStartDate = part.startDate;
      newParticipation.participationEndDate = part.endDate;
      newParticipation.Staff = await this.staffsRepository.findOne(
        part.staffId,
      );
      newParticipation.Project = newProjectResult;

      await this.participationsRepository.save(newParticipation);
    }

    return 'ok';
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
