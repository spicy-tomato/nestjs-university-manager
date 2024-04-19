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
  ProgramDto,
  ProgramListItemDto,
  UpdateProgramDto,
} from './dto';
import { ProgramsService } from './programs.service';

@Controller('programs')
@SwaggerClass({ tag: 'programs' })
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  @Roles(['Admin'])
  @SwaggerMethod({
    created: { type: ProgramListItemDto },
    conflict: {},
  })
  create(@Body() data: CreateProgramDto) {
    return this.programsService.create(data);
  }

  @Get()
  @SwaggerMethod({ ok: { type: ProgramListItemDto, isArray: true } })
  findByCondition(@Query() q: FindProgramDto) {
    return this.programsService.findByCondition(q);
  }

  @Get(':id')
  @SwaggerMethod({ ok: { type: ProgramDto, isNullable: true } })
  findOne(@Param('id') id: string) {
    return this.programsService.findById(id);
  }

  @Patch(':id')
  @Roles(['Admin'])
  @SwaggerMethod({
    ok: { type: ProgramListItemDto },
    notFound: {},
    conflict: {},
  })
  update(@Param('id') id: string, @Body() data: UpdateProgramDto) {
    return this.programsService.update(id, data);
  }

  @Delete(':id')
  @Roles(['Admin'])
  @SwaggerMethod({
    ok: { type: ProgramListItemDto },
    notFound: {},
  })
  remove(@Param('id') id: string) {
    return this.programsService.remove(id);
  }

  @Patch(':id/courses')
  @Roles(['Admin'])
  @SwaggerMethod({
    ok: { type: ProgramDto },
    notFound: {},
  })
  addCourses(@Param('id') id: string, @Body() data: AddCoursesDto) {
    return this.programsService.addCourses(id, data);
  }
}
