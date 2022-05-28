import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Department } from '../../entities/Department';

export class CreateInitialDepartmentData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Department)
      .values([
        {
          id: 1,
          depName: '백엔드',
        },
        {
          id: 2,
          depName: '프론트엔드',
        },
        {
          id: 3,
          depName: '마케팅',
        },
        {
          id: 4,
          depName: '디자인',
        },
        {
          id: 5,
          depName: '기획',
        },
      ])
      .execute();
  }
}
