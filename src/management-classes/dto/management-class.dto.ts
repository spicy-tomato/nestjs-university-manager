import { OmitType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { AcademicYearSimpleDto } from '../../academic-years/dto';
import { ProgramListItemDto } from '../../programs/dto';
import { StudentSimpleDto } from '../../students/dto';
import { FindManyQuery } from '../../types';

export class ManagementClassDto {
  id: string;
  code: string;
  name: string;
  academicYear: AcademicYearSimpleDto;
  program: ProgramListItemDto;
  students: StudentSimpleDto[];

  static readonly query: FindManyQuery<Prisma.ManagementClassDelegate> = {
    id: true,
    code: true,
    name: true,
    academicYear: { select: AcademicYearSimpleDto.query },
    program: { select: ProgramListItemDto.query },
    students: { select: StudentSimpleDto.query },
  };
}

export class ManagementClassListItemDto extends OmitType(ManagementClassDto, [
  'program',
  'students',
]) {
  static readonly query: FindManyQuery<Prisma.ManagementClassDelegate> = {
    id: true,
    code: true,
    name: true,
    academicYear: { select: AcademicYearSimpleDto.query },
  };
}
