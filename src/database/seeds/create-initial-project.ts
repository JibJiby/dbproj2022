import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Project } from '../../entities/Project';

export class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Project)
      .values([
        {
          id: 1,
          projectName: '첫 프로젝트',
          startDate: new Date(2022, 1, 1),
          endDate: new Date(2022, 2, 20),
          budget: 1000 * 10000,
          isCompleted: false,
          //
          Client: () => '1',
        },
        {
          id: 2,
          projectName: '두번째 프로젝트',
          startDate: new Date(2022, 3, 1),
          endDate: new Date(2022, 4, 29),
          budget: 5000 * 10000,
          isCompleted: false,
          //
          Client: () => '2',
        },
      ])
      .execute();
  }
}
