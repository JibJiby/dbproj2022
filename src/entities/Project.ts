import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from './Client';
import { Participation } from './Participation';

@Entity({ schema: 'dbproj2022', name: 'project' })
export class Project {
  @PrimaryGeneratedColumn({ type: 'int', name: 'proj_id' })
  id: number;

  @Column('varchar', { name: 'project_name', length: 150 })
  projectName: string;

  //   @Column('')

  @Column('date', { name: 'start_date', nullable: false })
  startDate: Date;

  @Column('date', { name: 'end_date', nullable: false })
  endDate: Date;

  @Column('int', { name: 'budget', nullable: false })
  budget: number;

  @Column('bool', { name: 'is_completed', nullable: false, default: false })
  isCompleted: boolean;

  // Relation

  @ManyToOne(() => Client, (client) => client.Projects, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'ClientId', referencedColumnName: 'id' }]) // client_id가 아닌 프로퍼티인 id로
  Client: Client;

  @OneToMany(() => Participation, (participation) => participation.Project)
  Participations: Participation[];
}
