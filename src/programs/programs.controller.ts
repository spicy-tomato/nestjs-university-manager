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
import { Roles } from '../common/decorators';
import {
  AddCoursesDto,
  CreateProgramDto,
  FindProgramDto,
  UpdateProgramDto,
} from './dto';
import { ProgramsService } from './programs.service';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  @Roles(['Admin'])
  create(@Body() data: CreateProgramDto) {
    return this.programsService.create(data);
  }

  @Get()
  findByCondition(@Query() q: FindProgramDto) {
    return this.programsService.findByCondition(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programsService.findById(id);
  }

  @Patch(':id')
  @Roles(['Admin'])
  update(@Param('id') id: string, @Body() data: UpdateProgramDto) {
    return this.programsService.update(id, data);
  }

  @Delete(':id')
  @Roles(['Admin'])
  remove(@Param('id') id: string) {
    return this.programsService.remove(id);
  }

  @Patch(':id/courses')
  @Roles(['Admin'])
  addCourses(@Param('id') id: string, @Body() data: AddCoursesDto) {
    return this.programsService.addCourses(id, data);
  }
}
