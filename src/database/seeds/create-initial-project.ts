import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Project } from '../../entities/Project';

export class CreateInitialProjectData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Project)
      .values([
        {
          id: 1,
          projectName: '약 성분 분석 프로젝트',
          startDate: new Date(2021, 8, 10),
          endDate: new Date(2021, 12, 25),
          budget: 4000 * 10000,
          isCompleted: true,
          //
          Client: () => '1',
        },
        {
          id: 2,
          projectName: '신규 파이낸셜 프로젝트',
          startDate: new Date(2021, 10, 25),
          endDate: new Date(2022, 4, 20),
          budget: 8000 * 10000,
          isCompleted: true,
          //
          Client: () => '2',
        },
        {
          id: 3,
          projectName: '베트남 모바일 채팅 앱 프로젝트',
          startDate: new Date(2022, 3, 1),
          endDate: new Date(2022, 7, 29),
          budget: 5000 * 10000,
          isCompleted: false,
          //
          Client: () => '3',
        },
        // {
        //   id: 4,
        //   projectName: '명지대학교 상권 프로젝트',
        //   startDate: new Date(2022, 7, 29), // 8월
        //   endDate: new Date(2022, 12, 29),
        //   budget: 12000 * 10000,
        //   isCompleted: false,
        //   //
        //   Client: () => '4',
        // },
      ])
      .execute();
  }
}
