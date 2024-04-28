import { Prisma } from '@prisma/client';
import { FindManyQuery } from '../../types';

export class ProfileDto {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;

  static readonly query: FindManyQuery<Prisma.ProfileDelegate> = {
    id: true,
    firstName: true,
    middleName: true,
    lastName: true,
  };
}
