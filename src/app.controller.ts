import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
  staffs() {
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
    return { staffs };
  }
}
