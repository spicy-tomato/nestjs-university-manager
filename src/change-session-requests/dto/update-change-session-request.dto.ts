import { PartialType } from '@nestjs/swagger';
import { CreateChangeSessionRequestDto } from './create-change-session-request.dto';

export class UpdateChangeSessionRequestDto extends PartialType(
  CreateChangeSessionRequestDto,
) {}
