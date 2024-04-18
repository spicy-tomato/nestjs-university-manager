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
import {
  AddCoursesDto,
  CreateProgramDto,
  FindProgramDto,
  UpdateProgramDto,
} from './dto';
import { ProgramsService } from './programs.service';

@Controller('programs')
@SwaggerClass({ tag: 'programs' })
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  @Roles(['Admin'])
  @SwaggerMethod({})
  create(@Body() data: CreateProgramDto) {
    return this.programsService.create(data);
  }

  @Get()
  @SwaggerMethod({})
  findByCondition(@Query() q: FindProgramDto) {
    return this.programsService.findByCondition(q);
  }

  @Get(':id')
  @SwaggerMethod({})
  findOne(@Param('id') id: string) {
    return this.programsService.findById(id);
  }

  @Patch(':id')
  @Roles(['Admin'])
  @SwaggerMethod({})
  update(@Param('id') id: string, @Body() data: UpdateProgramDto) {
    return this.programsService.update(id, data);
  }

  @Delete(':id')
  @Roles(['Admin'])
  @SwaggerMethod({})
  remove(@Param('id') id: string) {
    return this.programsService.remove(id);
  }

  @Patch(':id/courses')
  @Roles(['Admin'])
  @SwaggerMethod({})
  addCourses(@Param('id') id: string, @Body() data: AddCoursesDto) {
    return this.programsService.addCourses(id, data);
  }
}
