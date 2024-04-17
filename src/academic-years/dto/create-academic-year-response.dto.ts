import { IsNumber, Max, Min } from 'class-validator';

export class CreateAcademicYearResponseDto {
  code: string;
  name: string;
  id: string;
  startYear: number;
  endYear: number;
  isCurrent: boolean;
}
