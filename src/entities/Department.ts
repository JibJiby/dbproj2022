import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Staff } from './Staff';

@Entity({ schema: 'dbproj2022', name: 'department' })
export class Department {
  @PrimaryGeneratedColumn({ type: 'int', name: 'dep_id' })
  id: number;

  @Column('varchar', { name: 'dep_name', length: 50, unique: true })
  depName: string;

  /**
   * Relation
   */
  @OneToMany(() => Staff, (staff) => staff.Department)
  Staffs: Staff[];
}
