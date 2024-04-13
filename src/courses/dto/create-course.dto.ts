import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsMongoId({ each: true })
  programIds: string[];
}
