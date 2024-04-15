import { IsArray, IsMongoId } from 'class-validator';

export class UpdateCourseClassStudentsListDto {
  @IsArray()
  @IsMongoId({ each: true })
  studentIds: string[];
}
