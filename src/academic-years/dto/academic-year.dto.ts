import {
  academicYearQuery,
  academicYearSimpleQuery,
} from '../../common/queries';

export class AcademicYearDto {
  id: string;
  code: string;
  name: string;
  startYear: number;
  endYear: number;
  isCurrent: boolean;

  static get query() {
    return academicYearQuery;
  }
}

export class AcademicYearSimpleDto {
  id: string;
  code: string;
  name: string;

  static get query() {
    return academicYearSimpleQuery;
  }
}
