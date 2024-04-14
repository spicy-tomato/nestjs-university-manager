import { PartialType } from '@nestjs/swagger';
import { CreateCourseClassDto } from './create-course-class.dto';

export class FindCourseClassDto extends PartialType(CreateCourseClassDto) {}
