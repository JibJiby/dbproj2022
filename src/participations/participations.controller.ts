import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ParticipationsService } from './participations.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';

@Controller('api/participations')
export class ParticipationsController {
  constructor(private readonly participationsService: ParticipationsService) {}

  @Post()
  async create(@Body() createParticipationDto: CreateParticipationDto) {
    return this.participationsService.create(createParticipationDto);
  }

  @Get()
  async findAll() {
    return this.participationsService.findAll();
  }

  @Get('/staff/:id/ispossible')
  async checkParticipatingStaff(
    @Param('id') id: number,
    @Query('start') startDate: Date,
    @Query('end') endDate: Date,
  ) {
    console.log(startDate, endDate);
    return this.participationsService.checkPossibleStaff(
      +id,
      startDate,
      endDate,
    );
  }

  @Get('/staff/:id')
  async findByStaffId(@Param('id') id: number) {
    return this.participationsService.findByStaffId(+id);
  }

  @Get('/project/:id')
  async findByProjectId(@Param('id') id: number) {
    return this.participationsService.findByProjectId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParticipationDto: UpdateParticipationDto,
  ) {
    return this.participationsService.update(+id, updateParticipationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participationsService.remove(+id);
  }
}
