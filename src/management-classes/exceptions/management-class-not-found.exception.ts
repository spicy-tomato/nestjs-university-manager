import { Course } from '@prisma/client';
import { HttpNotFoundException } from '../../common/exceptions';

export class ManagementClassNotFoundException extends HttpNotFoundException<Course> {
  constructor(id: string) {
    super('ManagementClass', id, 'id');
  }
}
