import { applyDecorators } from '@nestjs/common';
import { ApiConflictResponse } from '@nestjs/swagger';

type ApiConflictResponseGenericParams = {
  description?: string;
};

export const ApiConflictResponseGeneric = (
  options?: ApiConflictResponseGenericParams,
) =>
  applyDecorators(
    ApiConflictResponse({
      description: options?.description,
      schema: {
        allOf: [
          {
            properties: {
              data: {
                type: 'object',
                nullable: true,
                example: null,
              },
              success: {
                type: 'boolean',
                example: false,
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
