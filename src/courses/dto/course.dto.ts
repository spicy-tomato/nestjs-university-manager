import { OmitType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ProgramListItemDto } from '../../programs/dto';
import { FindManyQuery } from '../../types';

export class CourseDto {
  id: string;
  code: string;
  name: string;
  createdAt: string;
  programs: ProgramListItemDto[];

  static readonly query: FindManyQuery<Prisma.CourseDelegate> = {
    id: true,
    code: true,
    name: true,
    createdAt: true,
    programs: {
      // ! Do not parse
      select: {
        id: true,
        code: true,
        name: true,
        createdAt: true,
      },
    },
  };
}

export class CourseListItemDto extends OmitType(CourseDto, ['programs']) {
  static readonly query: FindManyQuery<Prisma.CourseDelegate> = {
    id: true,
    code: true,
    name: true,
    createdAt: true,
  };
}
