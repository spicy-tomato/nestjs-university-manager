import { ApiProperty } from '@nestjs/swagger';
import { ChangeSessionRequestStatus } from '@prisma/client';
import { changeSessionRequestQuery } from '../../common/queries';
import { SessionListItemDto } from '../../sessions/dto';
import { TeacherSimpleDto } from '../../teachers/dto';

export class ChangeSessionRequestDto {
  id: string;
  session: SessionListItemDto;

  @ApiProperty({
    enum: ChangeSessionRequestStatus,
    enumName: 'ChangeSessionRequestStatus',
  })
  status: ChangeSessionRequestStatus;
  substituteTeacher?: TeacherSimpleDto;
  oldStartAt: string;
  oldEndAt: string;
  newStartAt: string;
  newEndAt: string;

  static get query() {
    return changeSessionRequestQuery;
  }
}
