import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';

export class FindCourseDto extends PartialType(
  OmitType(CreateCourseDto, ['programIds']),
) {}
