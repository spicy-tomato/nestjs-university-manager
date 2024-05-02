import { ChangeSessionRequest } from '@prisma/client';
import { HttpNotFoundException } from '../../common/exceptions';

export class ChangeSessionRequestNotFoundException extends HttpNotFoundException<ChangeSessionRequest> {
  constructor(id: string) {
    super('ChangeSessionRequest', id, 'id');
  }
}
