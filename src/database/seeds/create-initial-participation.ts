import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Participation } from '../../entities/Participation';

export class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Participation)
      .values([
        {
          id: 1,
          participationStartDate: new Date(2022, 1, 1),
          participationEndDate: new Date(2022, 2, 20),
          Role: () => '1',
          Project: () => '2',
          Staff: () => '1',
        },
        {
          id: 2,
          participationStartDate: new Date(2022, 3, 1),
          participationEndDate: new Date(2022, 4, 29),
          Role: () => '1',
          Project: () => '3',
          Staff: () => '3',
        },
      ])
      .execute();
  }
}
