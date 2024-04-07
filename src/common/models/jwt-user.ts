import { $Enums } from '@prisma/client';

export type JwtPayload = {
  sub: string;
  email: string;
  role: $Enums.Role;
};
