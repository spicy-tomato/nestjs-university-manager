import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { merge } from 'lodash';
import { OptionalField } from '../../types';
import { AutoBearer } from './auto-bearer.decorator';

type SwaggerClassParams = {
  tag: string;
  useAutoBearer?: boolean;
};

const defaultSwaggerClassParams: OptionalField<SwaggerClassParams> = {
  useAutoBearer: true,
};

export const SwaggerClass = (params?: SwaggerClassParams) => {
  const { tag, useAutoBearer } = merge({}, defaultSwaggerClassParams, params);
  const decorators: Array<
    ClassDecorator | MethodDecorator | PropertyDecorator
  > = [];

  decorators.push(ApiTags(tag));

  if (useAutoBearer) {
    decorators.push(AutoBearer());
  }

  return applyDecorators(...decorators);
};
