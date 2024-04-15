import { User } from '@prisma/client';
import { HttpConflictException } from '../../common/exceptions';

export class UserConflictException extends HttpConflictException<User> {
  constructor(fieldValue: User[keyof User], field: keyof User) {
    super('User', fieldValue, field);
  }
}
