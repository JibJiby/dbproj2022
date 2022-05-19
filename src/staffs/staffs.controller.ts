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
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Controller('api/staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Post()
  async create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.create(createStaffDto);
  }

  // @Get()
  // async findAll() {
  //   return this.staffsService.findAll();
  // }

  @Get()
  async findByName(@Query('name') name: string) {
    console.log('--------------------name');
    console.log(name);

    return this.staffsService.findByName(name);
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
