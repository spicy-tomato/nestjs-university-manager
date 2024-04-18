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
import { ApiTags } from '@nestjs/swagger';
import { AutoBearer, AutoSummarize, Roles } from '../common/decorators';
import { CoursesService } from './courses.service';
import { FindCourseDto } from './dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
@ApiTags('courses')
@AutoBearer()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @AutoSummarize()
  @Roles(['Admin'])
  create(@Body() data: CreateCourseDto) {
    return this.coursesService.create(data);
  }

  @Get()
  @AutoSummarize()
  findByCondition(@Query() q: FindCourseDto) {
    return this.coursesService.findByCondition(q);
  }

  @Get(':id')
  @AutoSummarize()
  findOne(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  @Patch(':id')
  @AutoSummarize()
  @Roles(['Admin'])
  update(@Param('id') id: string, @Body() data: UpdateCourseDto) {
    return this.coursesService.update(id, data);
  }

  @Delete(':id')
  @AutoSummarize()
  @Roles(['Admin'])
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
