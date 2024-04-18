import { OmitType } from '@nestjs/swagger';

class AcademicYearDto {
  id: string;
  name: string;
}

class ProgramDto {
  id: string;
  code: string;
  name: string;
}

class StudentProfileDto {
  id: string;
  firstName: string;
  lastName: string;
}

class StudentDto {
  profile: StudentProfileDto;
}

export class ManagementClassDto {
  id: string;
  code: string;
  name: string;
  academicYear: AcademicYearDto;
  program: ProgramDto;
  students: StudentDto[];
}

export class ManagementClassListItemDto extends OmitType(ManagementClassDto, [
  'program',
  'students',
]) {}
