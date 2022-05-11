import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateUserDto } from './dto/create-staff.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, Connection } from 'typeorm';
import bcrypt from 'bcrypt';
import { Staff } from '../entities/Staff';

@Injectable()
export class UsersService {
  // constructor(
  //   @InjectRepository(Staff) private usersRepository: Repository<Staff>,
  //   private connection: Connection,
  // ) {}
  // async create(email: string, name: string, password: string) {
  //   const queryRunner = this.connection.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   const user = await queryRunner.manager
  //     .getRepository(Staff)
  //     .findOne({ where: { email } });
  //   if (user) {
  //     throw new ForbiddenException('이미 존재하는 사용자입니다');
  //   }
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   try {
  //     const returned = await queryRunner.manager.getRepository(Staff).save({
  //       email,
  //       name,
  //       password: hashedPassword,
  //     });
  //     await queryRunner.commitTransaction();
  //     return true;
  //   } catch (error) {
  //     console.error(error);
  //     await queryRunner.rollbackTransaction();
  //     throw error;
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }
  // async findByEmail(email: string) {
  //   return this.usersRepository.findOne({
  //     where: { email },
  //     select: ['id', 'email', 'password'],
  //   });
  // }
  // // TODO:
  // findAll() {
  //   return `This action returns all users`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
