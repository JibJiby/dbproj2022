import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Role } from '../../entities/Role';

export class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        {
          id: 1,
          roleType: '개발',
        },
        {
          id: 2,
          roleType: 'PM',
        },
      ])
      .execute();
  }
}
