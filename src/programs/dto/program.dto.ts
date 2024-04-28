import { OmitType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { AcademicYearSimpleDto } from '../../academic-years/dto';
import { CourseListItemDto } from '../../courses/dto';
import { ManagementClassListItemDto } from '../../management-classes/dto';
import { FindManyQuery } from '../../types';

export class ProgramDto {
  id: string;
  code: string;
  name: string;
  createdAt: string;
  courses: CourseListItemDto[];
  managementClass: ManagementClassListItemDto[];

  static readonly query: FindManyQuery<Prisma.ProgramDelegate> = {
    id: true,
    code: true,
    name: true,
    createdAt: true,
    courses: { select: CourseListItemDto.query },
    managementClasses: {
      // ! Do not parse
      select: {
        id: true,
        code: true,
        name: true,
        academicYear: { select: AcademicYearSimpleDto.query },
      },
    },
  };
}

export class ProgramListItemDto extends OmitType(ProgramDto, [
  'courses',
  'managementClass',
]) {
  static readonly query: FindManyQuery<Prisma.ProgramDelegate> = {
    id: true,
    code: true,
    name: true,
    createdAt: true,
  };
}
