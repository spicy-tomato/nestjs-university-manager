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
import {
  JwtUser,
  Roles,
  SwaggerClass,
  SwaggerMethod,
} from '../common/decorators';
import { JwtUserDto } from '../common/dto';
import { SessionListItemDto } from '../sessions/dto/session.dto';
import { StudentScoreListItemDto, StudentSimpleDto } from '../students/dto';
import { CourseClassesService } from './course-classes.service';
import {
  CourseClassDto,
  CourseClassListItemDto,
  CreateCourseClassDto,
  FindCourseClassDto,
  UpdateCourseClassDto,
  UpdateCourseClassScoreDto,
  UpdateCourseClassStudentsListDto,
} from './dto';

@Controller('course-classes')
@SwaggerClass({ tag: 'course-classes' })
export class CourseClassesController {
  constructor(private readonly courseClassesService: CourseClassesService) {}

  @Post()
  @Roles(['Admin'])
  @SwaggerMethod({
    created: { type: CourseClassListItemDto },
    conflict: {},
  })
  createCourseClass(@Body() data: CreateCourseClassDto) {
    return this.courseClassesService.create(data);
  }

  @Get()
  @SwaggerMethod({ ok: { type: CourseClassListItemDto, isArray: true } })
  findCourseClassByCondition(
    @Query() q: FindCourseClassDto,
    @JwtUser() user: JwtUserDto,
  ) {
    return this.courseClassesService.findByCondition(q, user.role, user.sub);
  }

  @Get(':id')
  @SwaggerMethod({ ok: { type: CourseClassDto, isNullable: true } })
  findOneCourseClass(@Param('id') id: string) {
    return this.courseClassesService.findById(id);
  }

  @Patch(':id')
  @Roles(['Admin'])
  @SwaggerMethod({
    ok: { type: CourseClassListItemDto },
    notFound: {},
    conflict: {},
  })
  updateCourseClass(
    @Param('id') id: string,
    @Body() data: UpdateCourseClassDto,
  ) {
    return this.courseClassesService.update(id, data);
  }

  @Delete(':id')
  @Roles(['Admin'])
  @SwaggerMethod({
    ok: { type: CourseClassListItemDto },
    notFound: {},
  })
  removeCourseClass(@Param('id') id: string) {
    return this.courseClassesService.remove(id);
  }

  @Get(':id/scores')
  @Roles(['Admin', 'Teacher'])
  @SwaggerMethod({
    ok: { type: StudentScoreListItemDto, isArray: true },
    notFound: {},
  })
  getCourseClassScores(@Param('id') id: string) {
    return this.courseClassesService.getScores(id);
  }

  @Put(':id/scores')
  @Roles(['Teacher'])
  @SwaggerMethod({
    ok: { type: StudentScoreListItemDto, isArray: true },
    notFound: {},
  })
  updateCourseClassScores(
    @Param('id') id: string,
    @Body() data: UpdateCourseClassScoreDto,
  ) {
    return this.courseClassesService.updateScores(id, data);
  }

  @Get(':id/sessions')
  @SwaggerMethod({
    ok: { type: SessionListItemDto, isArray: true },
    notFound: {},
  })
  getCourseClassSessions(@Param('id') id: string) {
    return this.courseClassesService.getSessions(id);
  }

  @Put(':id/students')
  @SwaggerMethod({
    ok: { type: StudentSimpleDto, isArray: true },
    notFound: {},
  })
  updateCourseClassStudentsList(
    @Param('id') id: string,
    @Body() data: UpdateCourseClassStudentsListDto,
  ) {
    return this.courseClassesService.updateStudentsList(id, data);
  }
}
