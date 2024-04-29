import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { Roles, SwaggerClass } from '../common/decorators';
import { FindStudentDto } from './dto';
import { StudentsService } from './students.service';

@Controller('students')
@SwaggerClass({ tag: 'students' })
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @Roles(['Admin', 'Teacher'])
  findStudentsByCondition(@Query() q: FindStudentDto) {
    return this.studentsService.findByCondition(q);
  }

  @Get(':id')
  @Roles(['Admin', 'Teacher'])
  findOneStudent(@Param('id') id: string) {
    return this.studentsService.findById(id);
  }

  @Delete(':id')
  @Roles(['Admin'])
  removeStudent(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
