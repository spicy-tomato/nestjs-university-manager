import { PartialType } from '@nestjs/swagger';
import { CreateProgramDto } from './create-program.dto';

export class FindProgramDto extends PartialType(CreateProgramDto) {}
