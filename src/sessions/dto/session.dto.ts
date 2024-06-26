import { OmitType } from '@nestjs/swagger';
import { ChangeSessionRequestDto } from '../../change-session-requests/dto';
import { sessionListItemQuery, sessionQuery } from '../../common/queries';
import { CourseClassListItemDto } from '../../course-classes/dto';
import { TeacherSimpleDto } from '../../teachers/dto';

export class SessionDto {
  id: string;
  courseClass: CourseClassListItemDto;
  startAt: string;
  endAt: string;
  substituteTeacher?: TeacherSimpleDto;
  changeSessionRequests: ChangeSessionRequestDto[];

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
