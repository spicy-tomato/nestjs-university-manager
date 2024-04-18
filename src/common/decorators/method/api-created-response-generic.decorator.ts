import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { Result } from '../../dto';

export type ApiCreatedResponseGenericParams<T = {}> = {
  type: T;
  description?: string;
};

export const ApiCreatedResponseGeneric = <T extends Type<unknown>>({
  description,
  type,
}: ApiCreatedResponseGenericParams<T>) =>
  applyDecorators(
    ApiExtraModels(Result, type),
    ApiCreatedResponse({
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
                nullable: true,
                example: null,
              },
            },
          },
        ],
      },
    }),
  );
