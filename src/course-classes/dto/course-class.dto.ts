import { OmitType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { CourseListItemDto } from '../../courses/dto';
import { ProfileDto } from '../../profile/dto';
import { StudentSimpleDto } from '../../students/dto';
import { FindManyQuery } from '../../types';
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

  static readonly query: FindManyQuery<Prisma.CourseClassDelegate> = {
    id: true,
    code: true,
    name: true,
    course: { select: CourseListItemDto.query },
    startAt: true,
    endAt: true,
    sessionCount: true,
    isoSlots: true,
    students: { select: StudentSimpleDto.query },
  };
}

export class CourseClassListItemDto extends OmitType(CourseClassDto, [
  'students',
]) {
  // TODO: Missing `teacher`

  static readonly query: FindManyQuery<Prisma.CourseClassDelegate> = {
    id: true,
    code: true,
    name: true,
    course: { select: CourseListItemDto.query },
    teacher: {
      select: {
        id: true,
        teacherId: true,
        profile: { select: ProfileDto.query },
      },
    },
    startAt: true,
    endAt: true,
    sessionCount: true,
    isoSlots: true,
  };
}
