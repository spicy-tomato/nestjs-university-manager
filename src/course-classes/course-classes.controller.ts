import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AutoSummarize, Roles } from '../common/decorators';
import { CourseClassesService } from './course-classes.service';
import {
  CreateCourseClassDto,
  FindCourseClassDto,
  UpdateCourseClassDto,
  UpdateCourseClassStudentsListDto,
} from './dto';

@Controller('course-classes')
@ApiTags('course-classes')
export class CourseClassesController {
  constructor(private readonly courseClassesService: CourseClassesService) {}

  @Post()
  @AutoSummarize()
  @Roles(['Admin'])
  create(@Body() data: CreateCourseClassDto) {
    return this.courseClassesService.create(data);
  }

  @Get()
  @AutoSummarize()
  findAll(@Query() q: FindCourseClassDto) {
    return this.courseClassesService.findAll(q);
  }

  @Get(':id')
  @AutoSummarize()
  findOne(@Param('id') id: string) {
    return this.courseClassesService.findById(id);
  }

  @Patch(':id')
  @AutoSummarize()
  @Roles(['Admin'])
  update(@Param('id') id: string, @Body() data: UpdateCourseClassDto) {
    return this.courseClassesService.update(id, data);
  }

  @Delete(':id')
  @AutoSummarize()
  @Roles(['Admin'])
  remove(@Param('id') id: string) {
    return this.courseClassesService.remove(id);
  }

  @Get(':id/sessions')
  @AutoSummarize()
  getSessions(@Param('id') id: string) {
    return this.courseClassesService.getSessions(id);
  }

  @Put(':id/students')
  @AutoSummarize()
  updateStudentsList(
    @Param('id') id: string,
    @Body() data: UpdateCourseClassStudentsListDto,
  ) {
    return this.courseClassesService.updateStudentsList(id, data);
  }
}
