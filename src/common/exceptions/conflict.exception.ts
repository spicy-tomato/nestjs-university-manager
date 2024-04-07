import { ConflictException } from '@nestjs/common';

export class HttpConflictException<T> extends ConflictException {
  constructor(model: string, fieldValue: T, field = 'ID') {
    super(`${model} with ${field}='${fieldValue}' exists`);
  }
}
