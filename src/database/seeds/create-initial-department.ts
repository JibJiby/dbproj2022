import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Department } from '../../entities/Department';

export class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Department)
      .values([
        {
          id: 1,
          depName: '개발',
        },
        {
          id: 2,
          depName: '마케팅',
        },
      ])
      .execute();
  }
}
