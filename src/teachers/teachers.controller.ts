import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { Roles, SwaggerClass, SwaggerMethod } from '../common/decorators';
import { FindTeacherDto, TeacherDto, TeacherSimpleDto } from './dto';
import { TeachersService } from './teachers.service';

@Controller('teachers')
@SwaggerClass({ tag: 'teachers' })
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  @Roles(['Admin', 'Teacher'])
  @SwaggerMethod({ ok: { type: TeacherSimpleDto, isArray: true } })
  findTeachersByCondition(@Query() q: FindTeacherDto) {
    return this.teachersService.findByCondition(q);
  }

  @Get(':id')
  @Roles(['Admin', 'Teacher'])
  @SwaggerMethod({ ok: { type: TeacherDto, isArray: true } })
  findOneTeacher(@Param('id') id: string) {
    return this.teachersService.findById(id);
  }

  @Delete(':id')
  @Roles(['Admin'])
  @SwaggerMethod({
    ok: { type: TeacherSimpleDto, isArray: true },
    notFound: {},
  })
  removeTeacher(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}
