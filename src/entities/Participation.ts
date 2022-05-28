import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './Project';
import { Staff } from './Staff';

@Entity()
export class Participation {
  @Column('date', { name: 'participation_start_date' })
  participationStartDate: Date;

  @Column('date', { name: 'participation_end_date' })
  participationEndDate: Date;

  /**
   * Relation
   */
  @ManyToOne(() => Project, (project) => project.Participations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    primary: true,
  })
  @JoinColumn([{ name: 'ProjectId', referencedColumnName: 'id' }])
  Project: Project;

  @ManyToOne(() => Staff, (staff) => staff.Participations, { primary: true })
  @JoinColumn([{ name: 'StaffId', referencedColumnName: 'id' }])
  Staff: Staff;
}
