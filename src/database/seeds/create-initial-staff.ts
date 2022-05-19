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
          name: '현선재',
          socialNumber: '000000-0000000',
          password: await bcrypt.hash('aaa', salt),
          education: '명지대학교',
          Department: () => '1',
        },
        {
          id: 2,
          email: 'bbb@bbb.com',
          name: '김민수',
          socialNumber: '000000-0000000',
          password: await bcrypt.hash('aaa', salt),
          education: '서울대학교',
          Department: () => '2',
        },
        {
          id: 3,
          name: '테스트',
          education: '연세대학교',
          socialNumber: '000000-0000000',
          password: await bcrypt.hash('aaa', salt),
          Department: () => '3',
        },
        {
          id: 4,
          name: '홍길동',
          education: '명지대학교',
          socialNumber: '000000-0000000',
          password: await bcrypt.hash('aaa', salt),
          Department: () => '4',
        },
        {
          id: 5,
          name: '김형민',
          education: '홍익대학교',
          socialNumber: '000000-0000000',
          password: await bcrypt.hash('aaa', salt),
          Department: () => '4',
        },
      ])
      .execute();
  }
}
