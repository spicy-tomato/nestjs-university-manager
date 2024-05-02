import { OmitType } from '@nestjs/swagger';
import { programListItemQuery, programQuery } from '../../common/queries';
import { CourseListItemDto } from '../../courses/dto';
import { ManagementClassListItemDto } from '../../management-classes/dto';

export class ProgramDto {
  id: string;
  code: string;
  name: string;
  createdAt: string;
  courses: CourseListItemDto[];
  managementClass: ManagementClassListItemDto[];

  static get query() {
    return programQuery;
  }
}

export class ProgramListItemDto extends OmitType(ProgramDto, [
  'courses',
  'managementClass',
]) {
  static get query() {
    return programListItemQuery;
  }
}
