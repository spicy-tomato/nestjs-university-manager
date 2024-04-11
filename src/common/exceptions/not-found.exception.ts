import { NotFoundException } from '@nestjs/common';

export class HttpNotFoundException<T> extends NotFoundException {
  constructor(model: string, fieldValue: T[keyof T], field: keyof T) {
    super(`${model} with ${String(field)}='${fieldValue}' does not exist`);
  }
}
