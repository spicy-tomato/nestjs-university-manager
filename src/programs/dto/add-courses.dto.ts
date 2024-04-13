import { ArrayNotEmpty, IsArray, IsMongoId } from 'class-validator';

export class AddCoursesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  courses: string[];
}
