import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Roles } from '../common/decorators';
import { CoursesService } from './courses.service';
import { FindCourseDto } from './dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Roles(['Admin'])
  create(@Body() data: CreateCourseDto) {
    return this.coursesService.create(data);
  }

  @Get()
  findByCondition(@Query() q: FindCourseDto) {
    return this.coursesService.findByCondition(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  @Patch(':id')
  @Roles(['Admin'])
  update(@Param('id') id: string, @Body() data: UpdateCourseDto) {
    return this.coursesService.update(id, data);
  }

  @Delete(':id')
  @Roles(['Admin'])
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
