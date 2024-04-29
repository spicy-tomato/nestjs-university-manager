import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { Roles, SwaggerClass, SwaggerMethod } from '../common/decorators';
import { FindStudentDto, StudentDto, StudentSimpleDto } from './dto';
import { StudentsService } from './students.service';

@Controller('students')
@SwaggerClass({ tag: 'students' })
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @Roles(['Admin', 'Teacher'])
  @SwaggerMethod({ ok: { type: StudentSimpleDto, isArray: true } })
  findStudentsByCondition(@Query() q: FindStudentDto) {
    return this.studentsService.findByCondition(q);
  }

  @Get(':id')
  @Roles(['Admin', 'Teacher'])
  @SwaggerMethod({ ok: { type: StudentDto, isArray: true } })
  findOneStudent(@Param('id') id: string) {
    return this.studentsService.findById(id);
  }

  @Delete(':id')
  @Roles(['Admin'])
  @SwaggerMethod({
    ok: { type: StudentSimpleDto, isArray: true },
    notFound: {},
  })
  removeStudent(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
