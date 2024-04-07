import { HttpNotFoundException } from '../../common/exceptions';

export class AcademicYearNotFoundException extends HttpNotFoundException {
  constructor(id: string) {
    super('AcademicYear', id);
  }
}
