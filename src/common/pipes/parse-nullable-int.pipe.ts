import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { TypeHelper } from '../helpers';

@Injectable()
export class ParseNullableIntPipe<T extends {}> implements PipeTransform {
  constructor(private readonly fields: (keyof T)[] = []) {}

  transform(value: T, metadata: ArgumentMetadata): any {
    if (this.fields.length) {
      const result = structuredClone(value);
      Object.entries(value).forEach(([k, v]) => {
        result[k] = this._transform(v, metadata);
      });
      return result;
    }

    return this._transform(value, metadata);
  }

  private _transform(value: any, metadata: ArgumentMetadata): number {
    if (value === null || value === undefined) {
      return value;
    }

    const parseNumber = +value;
    if (TypeHelper.isNumber(parseNumber)) {
      return parseNumber;
    }

    if (metadata.data) {
      throw new BadRequestException(
        `Cannot parse value of ${metadata.data} to number`,
      );
    }

    throw new BadRequestException(`Cannot parse '${value}' to number`);
  }
}
