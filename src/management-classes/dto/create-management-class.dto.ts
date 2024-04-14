import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateManagementClassDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsMongoId()
  academicYearId: string;

  @IsNotEmpty()
  @IsMongoId()
  programId: string;
}
