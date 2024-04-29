import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class UpdateCourseClassScoreItemDto {
  @IsMongoId()
  id: string;

  @Min(0)
  @Max(10)
  @IsOptional()
  score: number | null;
}

export class UpdateCourseClassScoreDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => UpdateCourseClassScoreItemDto)
  data: UpdateCourseClassScoreItemDto[];
}
