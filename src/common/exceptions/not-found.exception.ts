import { NotFoundException } from '@nestjs/common';

export class HttpNotFoundException extends NotFoundException {
  constructor(model: string, id: string) {
    super(`${model} with ID ${id} does not exist`);
  }
}
