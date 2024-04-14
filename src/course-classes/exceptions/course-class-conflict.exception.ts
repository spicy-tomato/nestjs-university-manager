import { CourseClass } from '@prisma/client';
import { HttpConflictException } from '../../common/exceptions';

export class CourseClassConflictException extends HttpConflictException<CourseClass> {
  constructor(
    fieldValue: CourseClass[keyof CourseClass],
    field: keyof CourseClass,
  ) {
    super('CourseClass', fieldValue, field);
  }
}
