import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/decorators';
import { ParseNullableIntPipe } from '../common/pipes';
import { AcademicYearsService } from './academic-years.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';

@ApiTags('academic-years')
@Controller('academic-years')
export class AcademicYearsController {
  constructor(private readonly academicYearsService: AcademicYearsService) {}

  @Post()
  @Roles(['Admin'])
  create(@Body() data: CreateAcademicYearDto) {
    return this.academicYearsService.create(data);
  }

  @Get()
  findInRange(
    @Query(new ParseNullableIntPipe(['start', 'end']))
    q: {
      start: number;
      end: number;
    },
  ) {
    return this.academicYearsService.findInRange(q.start, q.end);
  }

  @Get('current')
  getCurrent() {
    return this.academicYearsService.getCurrent();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.academicYearsService.findById(id);
  }

  @Delete(':id')
  @Roles(['Admin'])
  remove(@Param('id') id: string) {
    return this.academicYearsService.remove(id);
  }

  @Put('current/:id')
  @Roles(['Admin'])
  updateCurrent(@Param('id') id: string) {
    return this.academicYearsService.updateCurrent(id);
  }
}
