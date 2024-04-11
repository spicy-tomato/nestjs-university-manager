import { ApiProperty } from '@nestjs/swagger';

export class Result<T = null> {
  @ApiProperty()
  data: T;
  success: boolean;
  message: string | null;
}
