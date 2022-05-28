import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './Project';
import { Role } from './Role';
import { Staff } from './Staff';

@Entity()
export class Participation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date', { name: 'participation_start_date' })
  participationStartDate: Date;

  @Column('date', { name: 'participation_end_date', nullable: true })
  participationEndDate: Date;

  @ManyToOne(() => Staff, (staff) => staff.Participates, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn([{ name: 'StaffId' }])
  Staff: Staff;

  @ManyToOne(() => Role, (role) => role.Participates, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn([{ name: 'RoleId' }])
  Role: Role;

  @ManyToOne(() => Project, (proj) => proj.Participates, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn([{ name: 'ProjId' }])
  Project: Project;
}
