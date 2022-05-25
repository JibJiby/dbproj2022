import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from '../entities/Staff';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import bcrypt from 'bcrypt';
import { LoginStaffDto } from './dto/login-staff.dto';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staff) private staffsRepository: Repository<Staff>,
  ) {}

  async join(createStaffDto: CreateStaffDto) {
    // login 페이지에서 POST 메소드 추가하기
    const { email, password, name, socialNumber, Department } = createStaffDto;
    const staff = await this.staffsRepository.findOne({ where: { email } });
    if (staff) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.staffsRepository.save({
      email,
      password: hashedPassword,
      name,
      socialNumber,
      Department,
    });

    return 'This action adds a new staff';
  }

  async login(loginStaffDto: LoginStaffDto) {
    //
    const { email, password } = loginStaffDto;
    const staff = await this.staffsRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
    console.log('-------------------------------------------');
    console.log('staff', staff);
    if (!staff) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    // console.log(password, staff.password);
    const result = await bcrypt.compare(password, staff.password);
    if (result) {
      return 'login ok';
    }
    throw new NotFoundException('존재하지 않는 사용자입니다.');
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

  async findByEmail(email: string) {
    return await this.staffsRepository
      .createQueryBuilder('staffs')
      .where('staffs.email = :email', { email })
      .getOne();
  }

  async findById(id: string) {
    return await this.staffsRepository
      .createQueryBuilder('staffs')
      .where('staffs.id = :id', { id })
      .getOne();
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return `This action updates a #${id} staff`;
  }

  remove(id: number) {
    return `This action removes a #${id} staff`;
  }
}
