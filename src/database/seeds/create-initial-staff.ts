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
          email: 'seonjae@mju.ac.kr',
          name: '현선재',
          socialNumber: '000000-0000000',
          password: await bcrypt.hash('aaa', salt),
          education: '명지대학교',
          salary: 5000 * 10000,
          Department: () => '1',
        },
        {
          id: 2,
          email: 'seoul@snu.ac.kr',
          name: '김서울',
          socialNumber: '111111-1111111',
          password: await bcrypt.hash('aaa', salt),
          education: '서울대학교',
          salary: 5000 * 10000,
          Department: () => '2',
        },
        {
          id: 3,
          name: '공경민',
          email: 'kyeongmin@mju.ac.kr',
          education: '명지대학교',
          socialNumber: '222222-2222222',
          salary: 5000 * 10000,
          password: await bcrypt.hash('aaa', salt),
          Department: () => '3',
        },
        {
          id: 4,
          name: '웃쿠',
          email: 'uku@mju.ac.kr',
          education: '명지대학교',
          salary: 5000 * 10000,
          socialNumber: '333333-3333333',
          password: await bcrypt.hash('aaa', salt),
          Department: () => '4',
        },
        {
          id: 5,
          name: '김건우',
          email: 'kungwoo@mju.ac.kr',
          education: '명지대학교',
          salary: 5000 * 10000,
          socialNumber: '444444-4444444',
          password: await bcrypt.hash('aaa', salt),
          Department: () => '2',
        },
        {
          id: 6,
          name: '김성집',
          email: 'seongjib@mju.ac.kr',
          education: '명지대학교',
          salary: 5000 * 10000,
          socialNumber: '555555-5555555',
          password: await bcrypt.hash('aaa', salt),
          Department: () => '1',
        },
        {
          id: 7,
          name: '지연세',
          email: 'yeonse@yeonse.ac.kr',
          education: '연세대학교',
          salary: 5000 * 10000,
          socialNumber: '666666-6666666',
          password: await bcrypt.hash('aaa', salt),
          Department: () => '2',
        },
        {
          id: 8,
          name: '이명사',
          email: 'myeongsa@mjusa.ac.kr',
          education: '명지사이버대학교',
          salary: 5000 * 10000,
          socialNumber: '666666-6666666',
          password: await bcrypt.hash('aaa', salt),
          Department: () => '1',
        },
        {
          id: 9,
          name: '최고딘',
          email: 'thisismarketing@fastcompany.com',
          education: '고졸',
          salary: 5000 * 10000,
          socialNumber: '777777-7777777',
          password: await bcrypt.hash('aaa', salt),
          Department: () => '4',
        },
        {
          id: 10,
          name: '홍고려',
          email: 'hong@korea.ac.kr',
          education: '고려대학교',
          salary: 5000 * 10000,
          socialNumber: '888888-8888888',
          password: await bcrypt.hash('aaa', salt),
          Department: () => '1',
        },
      ])
      .execute();
  }
}
