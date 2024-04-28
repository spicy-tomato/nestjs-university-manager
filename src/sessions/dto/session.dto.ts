import { OmitType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CourseClassListItemDto } from '../../course-classes/dto';
import { ProfileDto } from '../../profile/dto';
import { FindManyQuery } from '../../types';

class Teacher {
  id: string;
  teacherId: string;
  profile: ProfileDto;
}

export class SessionDto {
  id: string;
  courseClass: CourseClassListItemDto;
  startAt: string;
  endAt: string;
  substituteTeacher?: Teacher;

  static readonly query: FindManyQuery<Prisma.SessionDelegate> = {
    id: true,
    startAt: true,
    endAt: true,
    courseClass: { select: CourseClassListItemDto.query },
    substituteTeacher: {
      select: {
        id: true,
        teacherId: true,
        profile: { select: ProfileDto.query },
      },
    },
  };
}

export class SessionListItemDto extends OmitType(SessionDto, [
  'substituteTeacher',
]) {
  static readonly query: FindManyQuery<Prisma.SessionDelegate> = {
    id: true,
    startAt: true,
    endAt: true,
    courseClass: { select: CourseClassListItemDto.query },
  };
}
