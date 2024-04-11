import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class JwtUserDto {
  sub: string;
  email: string;
  @ApiProperty({ enum: Role, enumName: 'Role' })
  role: Role;
}
