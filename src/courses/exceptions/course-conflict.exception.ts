import { Course } from '@prisma/client';
import { HttpConflictException } from '../../common/exceptions';

export class CourseConflictException extends HttpConflictException<Course> {
  constructor(fieldValue: Course[keyof Course], field: keyof Course) {
    super('Course', fieldValue, field);
  }
}
