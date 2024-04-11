import { AcademicYear } from '@prisma/client';
import { HttpConflictException } from '../../common/exceptions';

export class AcademicYearConflictException extends HttpConflictException<AcademicYear> {
  constructor(
    fieldValue: AcademicYear[keyof AcademicYear],
    field: keyof AcademicYear,
  ) {
    super('AcademicYear', fieldValue, field);
  }
}
