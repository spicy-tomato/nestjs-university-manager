import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCourseClassDto } from './create-course-class.dto';

export class UpdateCourseClassDto extends OmitType(
  PartialType(CreateCourseClassDto),
  ['isoSlots', 'sessionCount', 'courseId'],
) {}
