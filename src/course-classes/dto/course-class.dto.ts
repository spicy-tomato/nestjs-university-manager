import { OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  courseClassListItemQuery,
  courseClassQuery,
} from '../../common/queries';
import { CourseListItemDto } from '../../courses/dto';
import { StudentSimpleDto } from '../../students/dto';
import { CreateCourseClassSlotDto } from './create-course-class.dto';

export class CourseClassSlotDto {
  startAt: string;
  endAt: string;
}

export class CourseClassDto {
  id: string;
  code: string;
  name: string;
  course: CourseListItemDto;
  startAt: string;
  endAt?: string;
  sessionCount: number;

  @Type(() => CreateCourseClassSlotDto)
  isoSlots: CourseClassSlotDto[];
  students: StudentSimpleDto[];

  static get query() {
    return courseClassQuery;
  }
}

export class CourseClassListItemDto extends OmitType(CourseClassDto, [
  'students',
]) {
  static get query() {
    return courseClassListItemQuery;
  }
}
