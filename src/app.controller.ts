import {
  Controller,
  Get,
  Query,
  Render,
  NotFoundException,
  Req,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StaffsService } from './staffs/staffs.service';
import { Staff } from './entities/Staff';
import { ProjectsService } from './projects/projects.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly staffsService: StaffsService,
    private readonly projectsService: ProjectsService,
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
  async projectList(@Req() req) {
    const isLogin = req.user ? true : false;

    const allProjects = await this.projectsService.findAll();
    console.log('allProjects');
    console.log(allProjects);
    return { isLogin, projects: allProjects };
  }

  @Get('project/registration')
  @Render('project-registration')
  registProject(@Req() req) {
    const isLogin = req.user ? true : false;
    return { isLogin };
  }

  @Get('/project/detail')
  @Render('detail')
  projectDetail(@Req() req) {
    const isLogin = req.user ? true : false;
    return { isLogin };
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

  @Get('/staff/:id')
  @Render('staff')
  async staff(@Req() req, @Param('id') id: number) {
    const isLogin = req.user ? true : false;

    if (id) {
      const staff = await this.staffsService.findById(id);
      const projects = [{}];
      return { staff: { ...staff }, projects: projects, isLogin };
    }
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
