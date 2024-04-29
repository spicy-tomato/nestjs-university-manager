import { OmitType } from '@nestjs/swagger';
import { studentQuery, studentSimpleQuery } from '../../common/queries';
import { ManagementClassListItemDto } from '../../management-classes/dto';
import { ProfileDto } from '../../profile/dto';

export class StudentDto {
  id: string;
  studentId: string;
  profile: ProfileDto;
  managementClass: ManagementClassListItemDto;

  static get query() {
    return studentQuery;
  }
}

export class StudentSimpleDto extends OmitType(StudentDto, [
  'managementClass',
]) {
  static get query() {
    return studentSimpleQuery;
  }
}
