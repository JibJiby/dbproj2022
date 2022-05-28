import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Participation } from '../../entities/Participation';

export class CreateInitialParticipationData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Participation)
      .values([
        {
          participationStartDate: new Date(2021, 8, 10),
          participationEndDate: new Date(2022, 0, 25),
          Project: () => '1',
          Staff: () => '1',
        },
        {
          participationStartDate: new Date(2021, 8, 10),
          participationEndDate: new Date(2022, 0, 25),
          Project: () => '1',
          Staff: () => '2',
        },
        {
          participationStartDate: new Date(2021, 8, 10),
          participationEndDate: new Date(2022, 0, 25),
          Project: () => '1',
          Staff: () => '3',
        },
        {
          participationStartDate: new Date(2021, 8, 10),
          participationEndDate: new Date(2022, 0, 25),
          Project: () => '1',
          Staff: () => '4',
        },
        {
          participationStartDate: new Date(2021, 8, 10),
          participationEndDate: new Date(2022, 0, 25),
          Project: () => '1',
          Staff: () => '5',
        },

        /**
         * 2
         */
        {
          participationStartDate: new Date(2021, 10, 25),
          participationEndDate: new Date(2022, 5, 20),
          Project: () => '2',
          Staff: () => '6',
        },
        {
          participationStartDate: new Date(2021, 10, 25),
          participationEndDate: new Date(2022, 5, 20),
          Project: () => '2',
          Staff: () => '7',
        },
        {
          participationStartDate: new Date(2021, 10, 25),
          participationEndDate: new Date(2022, 5, 20),
          Project: () => '2',
          Staff: () => '8',
        },
        {
          participationStartDate: new Date(2021, 10, 25),
          participationEndDate: new Date(2022, 5, 20),
          Project: () => '2',
          Staff: () => '9',
        },
        {
          participationStartDate: new Date(2021, 10, 25),
          participationEndDate: new Date(2022, 5, 20),
          Project: () => '2',
          Staff: () => '10',
        },

        /**
         * 3
         */
        {
          participationStartDate: new Date(2022, 3, 1),
          participationEndDate: new Date(2022, 7, 29),
          Project: () => '3',
          Staff: () => '11',
        },
        {
          participationStartDate: new Date(2022, 3, 1),
          participationEndDate: new Date(2022, 7, 29),
          Project: () => '3',
          Staff: () => '12',
        },
        {
          participationStartDate: new Date(2022, 3, 1),
          participationEndDate: new Date(2022, 7, 29),
          Project: () => '3',
          Staff: () => '13',
        },
        {
          participationStartDate: new Date(2022, 3, 1),
          participationEndDate: new Date(2022, 7, 29),
          Project: () => '3',
          Staff: () => '14',
        },
        {
          participationStartDate: new Date(2022, 3, 1),
          participationEndDate: new Date(2022, 7, 29),
          Project: () => '3',
          Staff: () => '15',
        },
      ])
      .execute();
  }
}
