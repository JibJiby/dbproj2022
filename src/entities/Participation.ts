import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Participation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date', { name: 'participation_start_date' })
  participationStartDate: Date;

  @Column('date', { name: 'participation_end_date' })
  participationEndDate: Date;
}
