import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Roles, SwaggerClass, SwaggerMethod } from '../common/decorators';
import { CourseClassesService } from './course-classes.service';
import {
  CourseClassDto,
  CreateCourseClassDto,
  FindCourseClassDto,
  UpdateCourseClassStudentsListDto,
} from './dto';

@Controller('course-classes')
@SwaggerClass({ tag: 'course-classes' })
export class CourseClassesController {
  constructor(private readonly courseClassesService: CourseClassesService) {}

  @Post()
  @Roles(['Admin'])
  @SwaggerMethod({
    created: { type: CourseClassDto },
    conflict: {},
  })
  create(@Body() data: CreateCourseClassDto) {
    return this.courseClassesService.create(data);
  }

  @Get()
  @SwaggerMethod({ ok: { type: CourseClassDto, isArray: true } })
  findByCondition(@Query() q: FindCourseClassDto) {
    return this.courseClassesService.findByCondition(q);
  }

  @Get(':id')
  @SwaggerMethod({ ok: { type: CourseClassDto, isNullable: true } })
  findOne(@Param('id') id: string) {
    return this.courseClassesService.findById(id);
  }

  // @Patch(':id')
  // @Roles(['Admin'])
  // update(@Param('id') id: string, @Body() data: UpdateCourseClassDto) {
  //   return this.courseClassesService.update(id, data);
  // }

  // @Delete(':id')
  // @Roles(['Admin'])
  // remove(@Param('id') id: string) {
  //   return this.courseClassesService.remove(id);
  // }

  // TODO: Response
  @Get(':id/sessions')
  @SwaggerMethod({ notFound: {} })
  getSessions(@Param('id') id: string) {
    return this.courseClassesService.getSessions(id);
  }

  // TODO: Response
  @Put(':id/students')
  @SwaggerMethod({ notFound: {} })
  updateStudentsList(
    @Param('id') id: string,
    @Body() data: UpdateCourseClassStudentsListDto,
  ) {
    return this.courseClassesService.updateStudentsList(id, data);
  }
}
