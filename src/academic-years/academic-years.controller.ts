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
import {
  ApiBadRequestResponseGeneric,
  ApiConflictResponseGeneric,
  ApiCreatedResponseGeneric,
  ApiNotFoundResponseGeneric,
  ApiOkResponseGeneric,
  AutoBearer,
  AutoSummarize,
  Roles,
} from '../common/decorators';
import { ParseNullableIntPipe } from '../common/pipes';
import { AcademicYearsService } from './academic-years.service';
import {
  AcademicYearDto,
  CreateAcademicYearDto,
  CreateAcademicYearResponseDto,
} from './dto';
import { FindAcademicYearInRangeQuery } from './queries';

@ApiTags('academic-years')
@Controller('academic-years')
@AutoBearer()
export class AcademicYearsController {
  constructor(private readonly academicYearsService: AcademicYearsService) {}

  @Post()
  @Roles(['Admin'])
  @AutoSummarize()
  @ApiCreatedResponseGeneric({ type: CreateAcademicYearResponseDto })
  @ApiBadRequestResponseGeneric()
  @ApiConflictResponseGeneric()
  create(@Body() data: CreateAcademicYearDto) {
    return this.academicYearsService.create(data);
  }

  @Get()
  @AutoSummarize()
  @ApiOkResponseGeneric({ type: AcademicYearDto })
  findInRange(
    @Query(new ParseNullableIntPipe(['start', 'end']))
    q: FindAcademicYearInRangeQuery,
  ) {
    return this.academicYearsService.findInRange(q.start, q.end);
  }

  @Get('current')
  @AutoSummarize()
  @ApiOkResponseGeneric({ type: AcademicYearDto })
  getCurrent() {
    return this.academicYearsService.getCurrent();
  }

  @Get(':id')
  @AutoSummarize()
  @ApiOkResponseGeneric({ type: AcademicYearDto })
  findOne(@Param('id') id: string) {
    return this.academicYearsService.findById(id);
  }

  @Delete(':id')
  @AutoSummarize()
  @Roles(['Admin'])
  @ApiOkResponseGeneric({ type: AcademicYearDto })
  @ApiNotFoundResponseGeneric()
  @ApiBadRequestResponseGeneric()
  remove(@Param('id') id: string) {
    return this.academicYearsService.remove(id);
  }

  @Put('current/:id')
  @AutoSummarize()
  @Roles(['Admin'])
  @ApiOkResponseGeneric({ type: AcademicYearDto })
  @ApiNotFoundResponseGeneric()
  updateCurrent(@Param('id') id: string) {
    return this.academicYearsService.updateCurrent(id);
  }
}
