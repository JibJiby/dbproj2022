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
import { ParticipationsService } from './participations/participations.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly staffsService: StaffsService,
    private readonly projectsService: ProjectsService,
    private readonly participationsService: ParticipationsService,
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

    const allProjects = await (
      await this.projectsService.findAll()
    ).sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    );
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

  @Get('/project/:id')
  @Render('project')
  async detailProject(@Req() req, @Param('id') id: number) {
    const isLogin = req.user ? true : false;

    if (id) {
      const project = await this.projectsService.findOne(id);

      const participationsInfo =
        await this.participationsService.findByProjectId(id);
      const participations = participationsInfo.map((v) => ({
        startDate: v.participationStartDate,
        endDate: v.participationEndDate,
        name: v.Staff.name,
        depName: v.Staff.Department.depName,
      }));

      return { project, isLogin, participations };
    }

    return { isLogin };
  }

  @Get('/staffs')
  @Render('staffs')
  async staffs(@Req() req, @Query('name') name: string) {
    const isLogin = req.user ? true : false;

    const unable: string[] = [];

    if (name) {
      const finded = await this.staffsService.findByName(name);
      if (finded.length > 0) {
        for (const v of finded) {
          const p = await this.participationsService.checkNotCompleted(v.id);
          unable.push(p ? 'unable' : '');
        }

        return {
          staffs: finded.map(convertStaff),
          isLogin,
          unable,
        };
      }
    }

    // name === undefined 인 경우
    const allStaffs = await this.staffsService.findAll();

    for (const v of allStaffs) {
      const p = await this.participationsService.checkNotCompleted(v.id);
      unable.push(p ? 'unable' : '');
    }

    return { staffs: allStaffs.map(convertStaff), isLogin, unable };
  }

  @Get('/staff/:id')
  @Render('staff')
  async staff(@Req() req, @Param('id') id: number) {
    const isLogin = req.user ? true : false;

    if (id) {
      const staff = await this.staffsService.findById(id);

      // 참가 정보
      const staffPartisipations =
        await this.participationsService.findByStaffId(id);

      const projects = [];
      for (const p of staffPartisipations) {
        const { projectName } = p.Project;
        projects.push({
          projectName,
          startDate: p.participationStartDate,
          endDate: p.participationEndDate,
        });
      }

      const participate = await this.participationsService.checkNotCompleted(
        id,
      );

      return {
        staff: { ...staff, participate: !participate },
        projects: projects,
        isLogin,
      };
    }
  }

  @Get('/client/registration')
  @Render('client-registration')
  registClient(@Req() req) {
    const isLogin = req.user ? true : false;
    return { isLogin };
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
