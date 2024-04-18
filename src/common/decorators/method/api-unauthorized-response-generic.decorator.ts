import { applyDecorators } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

type ApiUnauthorizedResponseGenericParams = {
  description?: string;
};

export const ApiUnauthorizedResponseGeneric = (
  options?: ApiUnauthorizedResponseGenericParams,
) =>
  applyDecorators(
    ApiUnauthorizedResponse({
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
