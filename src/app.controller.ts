import {
  Controller,
  Get,
  Query,
  Render,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StaffsService } from './staffs/staffs.service';
import { Staff } from './entities/Staff';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly staffsService: StaffsService,
  ) {}

  @Get()
  @Render('index')
  home(@Req() req) {
    console.log('--------------------------req.user--------------------------');
    // console.log(req.user);
    const isLogin = req.user ? true : false;
    return { isLogin };
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

  @Get('/project/list')
  @Render('project-list')
  projectList() {
    const message = '';
    return { message };
  }

  @Get('project/registration')
  @Render('project-registration')
  registProject(@Req() req) {
    const isLogin = req.user ? true : false;
    return { isLogin };
  }

  @Get('/project/detail')
  @Render('detail')
  projectDetail() {
    const message = '';
    return { message };
  }

  @Get('/staffs')
  @Render('staffs')
  async staffs(@Req() req, @Query('name') name: string) {
    const isLogin = req.user ? true : false;

    if (name) {
      const finded = await this.staffsService.findByName(name);
      if (finded.length > 0) {
        return {
          staffs: finded.map(convertStaff),
          isLogin,
        };
      }
    }

    // name === undefined 인 경우
    const allStaffs = await this.staffsService.findAll();
    return { staffs: allStaffs.map(convertStaff), isLogin };
  }
}

function convertStaff(staff: Staff) {
  return {
    staff_number: staff.id,
    staff_name: staff.name,
    department: staff.Department?.depName || '',
    education: staff.education,
  };
}
