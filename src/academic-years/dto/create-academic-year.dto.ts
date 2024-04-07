import { IsNumber, Max, Min } from 'class-validator';

export class CreateAcademicYearDto {
  @IsNumber()
  @Min(2010)
  @Max(2050)
  startYear: number;
}
