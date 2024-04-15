import { Student } from '@prisma/client';
import { HttpConflictException } from '../../common/exceptions';

export class StudentConflictException extends HttpConflictException<Student> {
  constructor(fieldValue: Student[keyof Student], field: keyof Student) {
    super('Student', fieldValue, field);
  }
}
