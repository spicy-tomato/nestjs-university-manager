import { OmitType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { AcademicYearSimpleDto } from '../../academic-years/dto';
import { ManagementClassListItemDto } from '../../management-classes/dto';
import { ProfileDto } from '../../profile/dto';
import { FindManyQuery } from '../../types';

export class StudentDto {
  id: string;
  studentId: string;
  profile: ProfileDto;
  managementClass: ManagementClassListItemDto;

  static readonly query: FindManyQuery<Prisma.StudentDelegate> = {
    id: true,
    studentId: true,
    profile: { select: ProfileDto.query },
    managementClass: {
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

export class StudentSimpleDto extends OmitType(StudentDto, [
  'managementClass',
]) {
  static readonly query: FindManyQuery<Prisma.StudentDelegate> = {
    id: true,
    studentId: true,
    profile: { select: ProfileDto.query },
  };
}
