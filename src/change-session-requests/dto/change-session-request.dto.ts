import { changeSessionRequestQuery } from '../../common/queries';
import { SessionListItemDto } from '../../sessions/dto';
import { TeacherSimpleDto } from '../../teachers/dto';

export class ChangeSessionRequestDto {
  session: SessionListItemDto;
  status: string;
  substituteTeacher?: TeacherSimpleDto;
  oldStartAt: string;
  oldEndAt: string;
  newStartAt: string;
  newEndAt: string;

  static get query() {
    return changeSessionRequestQuery;
  }
}
