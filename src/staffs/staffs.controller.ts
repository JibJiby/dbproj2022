import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Redirect,
  Req,
  UseGuards,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  Response,
} from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { User } from '../common/decorators/user.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { LoginStaffDto } from './dto/login-staff.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { NotLoggedInGuard } from '../auth/not-logged-in.guard';
import { LoggedInGuard } from '../auth/logged-in.guard';

@Controller('api/staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @ApiOperation({ summary: '회원가입' })
  @UseGuards(NotLoggedInGuard)
  @Post('/signup')
  async join(@Body() createStaffDto: CreateStaffDto) {
    const { email } = createStaffDto;

    const staff = await this.staffsService.findByEmail(email);
    if (staff) {
      throw new ConflictException('이메일이 이미 존재합니다.');
    }

    const result = await this.staffsService.join(createStaffDto);

    if (result) {
      return 'signup ok';
    } else {
      throw new ForbiddenException();
    }
  }

  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() loginStaffDto: LoginStaffDto) {
    return this.staffsService.login(loginStaffDto);
  }

  @ApiOperation({ summary: '로그아웃' })
  @UseGuards(LoggedInGuard)
  @Post('logout')
  async logout(@Response() res) {
    res.clearCookie('connect.sid', { httpOnly: true });
    return res.send('ok');
  }

  @Get()
  async findByName(@Query('name') name: string) {
    return this.staffsService.findByName(name);
  }

  @Get('/all')
  async findAll() {
    return this.staffsService.findAll();
  }

  @Get('/myinfo')
  async getStaffInfo(@User() user) {
    return user;
  }

  @Get(':id')
  async getTargetStaffInfo(@Param('id') id: number) {
    return this.staffsService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    return this.staffsService.update(+id, updateStaffDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.staffsService.remove(+id);
  }
}
