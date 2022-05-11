import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'dbproj2022', name: 'role' })
export class Role {
  @PrimaryGeneratedColumn({ name: 'role_id' })
  id: number;

  @Column('varchar', { name: 'role_type' })
  roleType: string;

  /**
   * Relation
   */
}
