import { ManagementClass } from '@prisma/client';
import { HttpConflictException } from '../../common/exceptions';

export class ManagementClassConflictException extends HttpConflictException<ManagementClass> {
  constructor(
    fieldValue: ManagementClass[keyof ManagementClass],
    field: keyof ManagementClass,
  ) {
    super('ManagementClass', fieldValue, field);
  }
}
