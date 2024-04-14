import { ManagementClass } from '@prisma/client';
import { HttpNotFoundException } from '../../common/exceptions';

export class ManagementClassNotFoundException extends HttpNotFoundException<ManagementClass> {
  constructor(id: string) {
    super('ManagementClass', id, 'id');
  }
}
