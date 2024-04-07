import { $Enums } from '@prisma/client';

export type LocalPayload = {
  id: string;
  email: string;
  role: $Enums.Role;
};
