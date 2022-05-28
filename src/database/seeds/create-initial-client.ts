import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Client } from '../../entities/Client';

export class CreateInitialClientData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Client)
      .values([
        { id: 1, clientName: '이선생', companyName: '독전 페이퍼 컴퍼니' },
        { id: 2, clientName: '김수연', companyName: '내이버 주식회사' },
        { id: 3, clientName: '최범수', companyName: '가가오 주식회사' },
        // TODO: 데모 시연에서 추가
        // { id: 4, clientName: '오명지', companyName: '명지 주식회사' },
      ])
      .execute();
  }
}
