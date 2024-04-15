import { Teacher } from '@prisma/client';
import { HttpConflictException } from '../../common/exceptions';

export class TeacherConflictException extends HttpConflictException<Teacher> {
  constructor(fieldValue: Teacher[keyof Teacher], field: keyof Teacher) {
    super('Teacher', fieldValue, field);
  }
}
