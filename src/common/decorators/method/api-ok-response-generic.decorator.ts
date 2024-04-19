import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { merge } from 'lodash';
import { Result } from '../../dto';

export type ApiOkResponseGenericParams<T extends string | Function = string> = {
  type?: T;
  description?: string;
  isArray?: boolean;
  isBoolean?: boolean;
  isNullable?: boolean;
};

const defaultApiOkResponseGenericParams: Required<
  Omit<ApiOkResponseGenericParams, 'description'>
> = {
  type: '',
  isArray: false,
  isBoolean: false,
  isNullable: false,
};

export const ApiOkResponseGeneric = <T extends Type<unknown>>(
  params: ApiOkResponseGenericParams<T>,
) => {
  const { type, description, isArray, isBoolean, isNullable } = merge(
    {},
    defaultApiOkResponseGenericParams,
    params,
  );

  const data = isBoolean
    ? { type: 'boolean' }
    : isArray
      ? {
          type: 'array',
          items: {
            $ref: getSchemaPath(type),
            nullable: isNullable,
          },
        }
      : {
          $ref: getSchemaPath(type),
          nullable: isNullable,
        };

  return applyDecorators(
    ApiExtraModels(Result, type),
    ApiOkResponse({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(Result<T>) },
          {
            properties: {
              data,
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
};
