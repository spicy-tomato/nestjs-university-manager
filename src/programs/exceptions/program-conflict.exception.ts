import { Program } from '@prisma/client';
import { HttpConflictException } from '../../common/exceptions';

export class ProgramConflictException extends HttpConflictException<Program> {
  constructor(fieldValue: Program[keyof Program], field: keyof Program) {
    super('Program', fieldValue, field);
  }
}
