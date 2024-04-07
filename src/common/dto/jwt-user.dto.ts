import { Role } from '@prisma/client';

export class JwtUserDto {
  sub: string;
  email: string;
  role: Role;
}
