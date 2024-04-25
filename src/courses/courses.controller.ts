import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Roles, SwaggerClass, SwaggerMethod } from '../common/decorators';
import { CoursesService } from './courses.service';
import {
  CourseDto,
  CourseListItemDto,
  CreateCourseDto,
  FindCourseDto,
  UpdateCourseDto,
} from './dto';

@Controller('courses')
@SwaggerClass({ tag: 'courses' })
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Roles(['Admin'])
  @SwaggerMethod({
    created: { type: CourseDto },
    notFound: {},
    conflict: {},
  })
  createCourse(@Body() data: CreateCourseDto) {
    return this.coursesService.create(data);
  }

  @Get()
  @SwaggerMethod({ ok: { type: CourseListItemDto, isArray: true } })
  findCourseByCondition(@Query() q: FindCourseDto) {
    return this.coursesService.findByCondition(q);
  }

  @Get(':id')
  @SwaggerMethod({ ok: { type: CourseDto, isNullable: true } })
  findOneCourse(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  @Patch(':id')
  @Roles(['Admin'])
  @SwaggerMethod({
    ok: { type: CourseDto },
    notFound: {},
    conflict: {},
  })
  updateCourse(@Param('id') id: string, @Body() data: UpdateCourseDto) {
    return this.coursesService.update(id, data);
  }

  @Delete(':id')
  @Roles(['Admin'])
  @SwaggerMethod({
    ok: { type: CourseDto },
    notFound: {},
  })
  removeCourse(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
