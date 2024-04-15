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
import { Roles } from '../common/decorators';
import { CourseClassesService } from './course-classes.service';
import {
  CreateCourseClassDto,
  FindCourseClassDto,
  UpdateCourseClassDto,
  UpdateCourseClassStudentsListDto,
} from './dto';

@Controller('course-classes')
export class CourseClassesController {
  constructor(private readonly courseClassesService: CourseClassesService) {}

  @Post()
  @Roles(['Admin'])
  create(@Body() data: CreateCourseClassDto) {
    return this.courseClassesService.create(data);
  }

  @Get()
  findAll(@Query() q: FindCourseClassDto) {
    return this.courseClassesService.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseClassesService.findById(id);
  }

  @Patch(':id')
  @Roles(['Admin'])
  update(@Param('id') id: string, @Body() data: UpdateCourseClassDto) {
    return this.courseClassesService.update(id, data);
  }

  @Delete(':id')
  @Roles(['Admin'])
  remove(@Param('id') id: string) {
    return this.courseClassesService.remove(id);
  }

  @Get(':id/sessions')
  getSessions(@Param('id') id: string) {
    return this.courseClassesService.getSessions(id);
  }

  @Put(':id/students')
  updateStudentsList(
    @Param('id') id: string,
    @Body() data: UpdateCourseClassStudentsListDto,
  ) {
    return this.courseClassesService.updateStudentsList(id, data);
  }
}
