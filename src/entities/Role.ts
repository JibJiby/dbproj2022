import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Participation } from './Participation';

@Entity({ schema: 'dbproj2022', name: 'role' })
export class Role {
  @PrimaryGeneratedColumn({ name: 'role_id' })
  id: number;

  @Column('varchar', { name: 'role_type' })
  roleType: string;

  /**
   * Relation
   */
  @OneToMany(() => Participation, (parti) => parti.Role)
  Participates: Participation[];
}
