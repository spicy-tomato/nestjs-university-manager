import { Program } from '@prisma/client';
import { HttpNotFoundException } from '../../common/exceptions';

export class ProgramNotFoundException extends HttpNotFoundException<Program> {
  constructor(id: string) {
    super('Program', id, 'id');
  }
}
