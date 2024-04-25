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
import { Roles, SwaggerClass, SwaggerMethod } from '../common/decorators';
import { ParseNullableIntPipe } from '../common/pipes';
import { AcademicYearsService } from './academic-years.service';
import { AcademicYearDto, CreateAcademicYearDto } from './dto';
import { FindAcademicYearInRangeQuery } from './queries';

@Controller('academic-years')
@SwaggerClass({ tag: 'academic-years' })
export class AcademicYearsController {
  constructor(private readonly academicYearsService: AcademicYearsService) {}

  @Post()
  @Roles(['Admin'])
  @SwaggerMethod({
    created: { type: AcademicYearDto },
    badRequest: {},
    conflict: {},
  })
  createAcademicYear(@Body() data: CreateAcademicYearDto) {
    return this.academicYearsService.create(data);
  }

  @Get()
  @SwaggerMethod({ ok: { type: AcademicYearDto, isArray: true } })
  findAcademicYearInRange(
    @Query(new ParseNullableIntPipe(['start', 'end']))
    q: FindAcademicYearInRangeQuery,
  ) {
    return this.academicYearsService.findInRange(q.start, q.end);
  }

  @Get('current')
  @SwaggerMethod({ ok: { type: AcademicYearDto, isNullable: true } })
  getCurrentAcademicYear() {
    return this.academicYearsService.getCurrent();
  }

  @Get(':id')
  @SwaggerMethod({ ok: { type: AcademicYearDto, isNullable: true } })
  findOneAcademicYear(@Param('id') id: string) {
    return this.academicYearsService.findById(id);
  }

  @Delete(':id')
  @Roles(['Admin'])
  @SwaggerMethod({
    ok: { type: AcademicYearDto },
    badRequest: {},
    notFound: {},
  })
  removeAcademicYear(@Param('id') id: string) {
    return this.academicYearsService.remove(id);
  }

  @Put('current/:id')
  @Roles(['Admin'])
  @SwaggerMethod({ ok: { isBoolean: true }, notFound: {} })
  updateCurrent(@Param('id') id: string) {
    return this.academicYearsService.updateCurrent(id);
  }
}
