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
  create(@Body() data: CreateCourseDto) {
    return this.coursesService.create(data);
  }

  @Get()
  @SwaggerMethod({ ok: { type: CourseListItemDto, isArray: true } })
  findByCondition(@Query() q: FindCourseDto) {
    return this.coursesService.findByCondition(q);
  }

  @Get(':id')
  @SwaggerMethod({ ok: { type: CourseDto, isNullable: true } })
  findOne(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  @Patch(':id')
  @Roles(['Admin'])
  @SwaggerMethod({
    ok: { type: CourseDto },
    notFound: {},
    conflict: {},
  })
  update(@Param('id') id: string, @Body() data: UpdateCourseDto) {
    return this.coursesService.update(id, data);
  }

  @Delete(':id')
  @Roles(['Admin'])
  @SwaggerMethod({
    ok: { type: CourseDto },
    notFound: {},
  })
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
