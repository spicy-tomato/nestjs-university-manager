import { AcademicYear } from '@prisma/client';
import { HttpNotFoundException } from '../../common/exceptions';

export class AcademicYearNotFoundException extends HttpNotFoundException<AcademicYear> {
  constructor(id: string) {
    super('AcademicYear', id, 'id');
  }
}
