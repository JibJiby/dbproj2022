import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import bcrypt from 'bcrypt';
import { Staff } from '../../entities/Staff';

export class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const salt = await bcrypt.genSalt();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Staff)
      .values([
        {
          id: 1,
          email: 'aaa@aaa.com',
          name: 'aaa',
          socialNumber: '1',
          password: await bcrypt.hash('aaa', salt),
        },
        {
          id: 2,
          email: 'bbb@bbb.com',
          name: 'bbb',
          socialNumber: '2',
          password: await bcrypt.hash('bbb', salt),
        },
      ])
      .execute();
  }
}
