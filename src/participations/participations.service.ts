import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participation } from '../entities/Participation';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';

@Injectable()
export class ParticipationsService {
  constructor(
    @InjectRepository(Participation)
    private participationsRepository: Repository<Participation>,
  ) {}

  async create(createParticipationDto: CreateParticipationDto) {
    const { participationStartDate, participationEndDate, Staff, Project } =
      createParticipationDto;

    console.log('createParticipationDto');
    console.log(createParticipationDto);

    const newParticipation = new Participation();
    newParticipation.participationStartDate = participationStartDate;
    newParticipation.participationEndDate = participationEndDate;
    newParticipation.Staff = Staff;
    newParticipation.Project = Project;

    return await this.participationsRepository.save(newParticipation);
  }

  async findAll() {
    const result = await this.participationsRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.Staff', 'staffs')
      .leftJoinAndSelect('p.Project', 'projects')
      .getMany();

    return result;
  }

  async findByStaffId(id: number) {
    const result = await this.participationsRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.Staff', 'staffs')
      .leftJoinAndSelect('p.Project', 'projects')
      .where('p.StaffId = :id', { id })
      .getMany();

    return result;
  }

  async findByProjectId(id: number) {
    const result = await this.participationsRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.Staff', 'staffs')
      .leftJoinAndSelect('staffs.Department', 'deps')
      .leftJoinAndSelect('p.Project', 'projects')
      .where('p.ProjectId = :id', { id })
      .getMany();

    return result;
  }

  async checkPossibleStaff(id: number, startDate: Date, endDate: Date) {
    const result = await this.participationsRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.Staff', 'staffs')
      .leftJoinAndSelect('p.Project', 'projects')
      .where('p.StaffId = :id', { id })
      .orderBy('p.participationStartDate', 'DESC')
      .getOne();

    // console.log(
    //   '------------------------------------------------------------------------',
    // );
    // console.log(result);

    // console.log(
    //   '------------------------------------------------------------------------',
    // );
    console.log('프로젝트 예정 날짜   ::   ', startDate, endDate);
    console.log(
      '최근 기록   ::   ',
      result?.participationStartDate,
      result?.participationEndDate,
    );

    // 처음 프로젝트하는 직원인 경우
    if (
      result?.participationStartDate === undefined ||
      result?.participationEndDate === undefined
    ) {
      return true;
    }

    if (result.participationEndDate < startDate) {
      return true;
    } else {
      return false;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} participation`;
  }

  update(id: number, updateParticipationDto: UpdateParticipationDto) {
    return `This action updates a #${id} participation`;
  }

  remove(id: number) {
    return `This action removes a #${id} participation`;
  }
}
