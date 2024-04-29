import { OmitType } from '@nestjs/swagger';
import { AcademicYearSimpleDto } from '../../academic-years/dto';
import {
  managementClassListItemQuery,
  managementClassQuery,
} from '../../common/queries';
import { ProgramListItemDto } from '../../programs/dto';
import { StudentSimpleDto } from '../../students/dto';

export class ManagementClassDto {
  id: string;
  code: string;
  name: string;
  academicYear: AcademicYearSimpleDto;
  program: ProgramListItemDto;
  students: StudentSimpleDto[];

  static get query() {
    return managementClassQuery;
  }
}

export class ManagementClassListItemDto extends OmitType(ManagementClassDto, [
  'program',
  'students',
]) {
  static get query() {
    return managementClassListItemQuery;
  }
}
