import { ConflictException } from '@nestjs/common';

export class HttpConflictException<T> extends ConflictException {
  constructor(model: string, fieldValue: T[keyof T], field: keyof T) {
    super(`${model} with ${String(field)}='${fieldValue}' exists`);
  }
}
