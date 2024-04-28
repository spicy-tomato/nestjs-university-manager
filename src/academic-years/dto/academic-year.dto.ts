import { Prisma } from '@prisma/client';
import { FindManyQuery } from '../../types';

export class AcademicYearDto {
  id: string;
  code: string;
  name: string;
  startYear: number;
  endYear: number;
  isCurrent: boolean;

  static readonly query: FindManyQuery<Prisma.AcademicYearDelegate> = {
    id: true,
    code: true,
    name: true,
    startYear: true,
    endYear: true,
    isCurrent: true,
  };
}

export class AcademicYearSimpleDto {
  id: string;
  code: string;
  name: string;

  static readonly query: FindManyQuery<Prisma.AcademicYearDelegate> = {
    id: true,
    code: true,
    name: true,
  };
}
