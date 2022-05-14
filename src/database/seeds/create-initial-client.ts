import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Client } from '../../entities/Client';

export class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Client)
      .values([
        { id: 1, clientName: '김성집', companyName: '네이버' },
        { id: 2, clientName: '김건우', companyName: '카카오' },
      ])
      .execute();
  }
}
