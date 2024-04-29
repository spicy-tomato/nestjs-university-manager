import { OmitType } from '@nestjs/swagger';
import { courseListItemQuery, courseQuery } from '../../common/queries';
import { ProgramListItemDto } from '../../programs/dto';

export class CourseDto {
  id: string;
  code: string;
  name: string;
  createdAt: string;
  programs: ProgramListItemDto[];

  static get query() {
    return courseQuery;
  }
}

export class CourseListItemDto extends OmitType(CourseDto, ['programs']) {
  static get query() {
    return courseListItemQuery;
  }
}
