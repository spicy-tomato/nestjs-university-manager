import { Student } from '@prisma/client';
import { HttpNotFoundException } from '../../common/exceptions';

export class StudentNotFoundException extends HttpNotFoundException<Student> {
  constructor(id: string) {
    super('Student', id, 'id');
  }
}
