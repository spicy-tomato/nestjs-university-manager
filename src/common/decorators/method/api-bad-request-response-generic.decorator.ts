import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';

export type ApiBadRequestResponseGenericParams = {
  description?: string;
};

export const ApiBadRequestResponseGeneric = (
  options?: ApiBadRequestResponseGenericParams,
) =>
  applyDecorators(
    ApiBadRequestResponse({
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
