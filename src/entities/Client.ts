import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './Project';

@Entity({ schema: 'dbproj2022', name: 'client' })
export class Client {
  @PrimaryGeneratedColumn({ type: 'int', name: 'client_id' })
  id: number;

  @Column('varchar', { name: 'client_name', length: 10 })
  clientName: string;

  @Column('varchar', { name: 'company_name', length: 10 })
  companyName: string;

  // Relation

  @OneToMany(() => Project, (project) => project.Client)
  Projects: Project[];
}
