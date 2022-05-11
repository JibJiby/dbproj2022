import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from './Department';

// @Index('email', { unique: true })  // 이건 미리 있어야함.
@Entity({ schema: 'dbproj2022', name: 'staff' })
export class Staff {
  @PrimaryGeneratedColumn({ type: 'int', name: 'staff_number' })
  id: number;

  @Column('varchar', { name: 'staff_name', unique: true, length: 50 })
  name: string;

  // @Column('varchar', { name: 'social_number', length: 30 })
  // socialNumber: string;

  @Column('varchar', { name: 'password', length: 100, select: false })
  password: string;

  @Column('varchar', { nullable: true })
  education: string;

  @Column('int', { nullable: true })
  salary: number;

  @Column('int', { nullable: true })
  incentive: number;

  @Column('varchar', { nullable: true })
  email: string;

  @Column('varchar', { nullable: true })
  skill: string;

  /**
   * Relation
   */
  @ManyToOne(() => Department, (department) => department.Staffs)
  @JoinColumn([{ name: 'DepId', referencedColumnName: 'id' }])
  Department: Department;
}
