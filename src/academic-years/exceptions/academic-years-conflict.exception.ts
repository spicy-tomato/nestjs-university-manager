import { HttpConflictException } from '../../common/exceptions';

export class AcademicYearConflictException<T> extends HttpConflictException<T> {
  constructor(fieldValue: T, field: string) {
    super('AcademicYear', fieldValue, field);
  }
}
