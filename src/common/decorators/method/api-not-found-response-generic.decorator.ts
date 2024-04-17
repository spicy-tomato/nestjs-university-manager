import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse } from '@nestjs/swagger';

type ApiNotFoundResponseGenericParams = {
  description?: string;
};

export const ApiNotFoundResponseGeneric = (
  options?: ApiNotFoundResponseGenericParams,
) =>
  applyDecorators(
    ApiNotFoundResponse({
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
