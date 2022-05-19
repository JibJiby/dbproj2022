import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { StaffsService } from './staffs/staffs.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly staffsService: StaffsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hi')
  getHi(): string {
    return 'hi';
  }

  @Get('/testejs')
  @Render('testejs')
  testejs() {
    const message = 'ejs 테스트입니다. ';
    return { message };
  }

  @Get('/login')
  @Render('login')
  login() {
    const result = '';
    return { result };
  }

  @Get('/manage')
  @Render('manage')
  manage() {
    const manage = '';
    return { manage };
  }

  @Get('/staffs')
  @Render('staffs')
  async staffs(@Query('name') name: string) {
    const staffs = [
      {
        staff_number: 1,
        staff_name: '현선재',
        department: '백엔드',
        education: '명지대학교',
      },
      {
        staff_number: 2,
        staff_name: '홍길동',
        department: '프론트엔드',
        education: '서울대학교',
      },
      {
        staff_number: 3,
        staff_name: '테스트',
        department: '마케팅',
        education: '연세대학교',
      },
      {
        staff_number: 4,
        staff_name: '홍길동',
        department: '마케팅',
        education: '명지대학교',
      },
      {
        staff_number: 5,
        staff_name: '김형민',
        department: '디자인',
        education: '홍익대학교',
      },
    ];

    const finded = await this.staffsService.findByName(name);
    // console.log('findededed');
    // console.log(finded);
    if (finded.length > 0) {
      console.log({ staffs: finded });
      return {
        staffs: finded.map((v) => ({
          staff_number: v.id,
          staff_name: v.name,
          // TODO: 실제 데이터 넣어주기
          department: '부서 미정',
          education: v.education === null ? '고졸' : '대졸',
        })),
      };
    } else {
      console.log({ staffs });
      return { staffs };
    }
  }
}
