import { Teacher } from '@prisma/client';
import { HttpNotFoundException } from '../../common/exceptions';

export class TeacherNotFoundException extends HttpNotFoundException<Teacher> {
  constructor(id: string) {
    super('Teacher', id, 'id');
  }
}
