import { OmitType } from '@nestjs/swagger';

class Program {
  id: string;
  code: string;
  name: string;
}

export class CourseDto {
  id: string;
  code: string;
  name: string;
  createdAt: string;
  programs: Program[];
}

export class CourseListItemDto extends OmitType(CourseDto, ['programs']) {}
