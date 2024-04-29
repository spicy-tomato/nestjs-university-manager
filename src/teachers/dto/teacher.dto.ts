import { OmitType } from '@nestjs/swagger';
import { teacherQuery, teacherSimpleQuery } from '../../common/queries';
import { CourseClassListItemDto } from '../../course-classes/dto';
import { ProfileDto } from '../../profile/dto';

export class TeacherDto {
  id: string;
  teacherId: string;
  profile: ProfileDto;
  courseClasses: CourseClassListItemDto;

  static get query() {
    return teacherQuery;
  }
}

export class TeacherSimpleDto extends OmitType(TeacherDto, ['courseClasses']) {
  static get query() {
    return teacherSimpleQuery;
  }
}
