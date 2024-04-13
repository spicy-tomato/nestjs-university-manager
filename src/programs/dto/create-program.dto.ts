import { IsNotEmpty } from 'class-validator';

export class CreateProgramDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  name: string;
}
