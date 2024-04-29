import { OmitType } from '@nestjs/swagger';
import { sessionListItemQuery, sessionQuery } from '../../common/queries';
import { CourseClassListItemDto } from '../../course-classes/dto';
import { ProfileDto } from '../../profile/dto';

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

  static get query() {
    return sessionQuery;
  }
}

export class SessionListItemDto extends OmitType(SessionDto, [
  'substituteTeacher',
]) {
  static get query() {
    return sessionListItemQuery;
  }
}
