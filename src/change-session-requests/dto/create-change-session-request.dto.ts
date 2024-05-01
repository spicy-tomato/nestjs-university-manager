import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';

export class CreateChangeSessionRequestDto {
  @IsNotEmpty()
  @IsDateString()
  startAt: string;

  @IsNotEmpty()
  @IsDateString()
  endAt: string;

  @ValidateIf((o) => !!o.substituteTeacherId)
  @IsMongoId()
  substituteTeacherId?: string;
}
