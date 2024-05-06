import { OmitType, PartialType } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { CreateChangeSessionRequestDto } from './create-change-session-request.dto';

export class FindChangeSessionRequestDto extends PartialType(
  OmitType(CreateChangeSessionRequestDto, ['startAt', 'endAt']),
) {
  @IsNotEmpty()
  @IsDateString()
  from: string;

  @IsNotEmpty()
  @IsDateString()
  to: string;
}
