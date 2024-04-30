import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { IsBeforeIso, IsIso8601Duration } from '../../common/decorators';

export class CreateCourseClassSlotDto {
  @IsNotEmpty()
  @IsIso8601Duration()
  @IsBeforeIso('endAt')
  startAt: string;

  @IsNotEmpty()
  @IsIso8601Duration()
  endAt: string;
}

export class CreateCourseClassDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  startAt: string;

  @ValidateIf((o) => !!o.endAt)
  @IsDateString()
  endAt?: string;

  @IsNotEmpty()
  @Min(1)
  @Max(50)
  sessionCount: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateCourseClassSlotDto)
  isoSlots: CreateCourseClassSlotDto[];

  @IsNotEmpty()
  @IsMongoId()
  courseId: string;

  @IsNotEmpty()
  @IsMongoId()
  academicYearId: string;

  @ValidateIf((o) => !!o.teacherId)
  @IsMongoId()
  teacherId: string;
}
