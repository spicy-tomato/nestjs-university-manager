import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { Result } from '../../dto';

type ApiOkResponseGenericParams<T> = {
  type: T;
  description?: string;
};

export const ApiOkResponseGeneric = <T extends Type<unknown>>({
  description,
  type,
}: ApiOkResponseGenericParams<T>) =>
  applyDecorators(
    ApiExtraModels(Result, type),
    ApiOkResponse({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(Result<T>) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(type),
              },
              success: {
                type: 'boolean',
              },
              message: {
                type: 'string',
              },
            },
          },
        ],
      },
    }),
  );
