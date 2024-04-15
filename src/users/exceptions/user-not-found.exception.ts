import { User } from '@prisma/client';
import { HttpNotFoundException } from '../../common/exceptions';

export class UserNotFoundException extends HttpNotFoundException<User> {
  constructor(id: string) {
    super('User', id, 'id');
  }
}
