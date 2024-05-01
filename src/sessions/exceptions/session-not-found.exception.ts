import { Session } from '@prisma/client';
import { HttpNotFoundException } from '../../common/exceptions';

export class SessionNotFoundException extends HttpNotFoundException<Session> {
  constructor(id: string) {
    super('Session', id, 'id');
  }
}
