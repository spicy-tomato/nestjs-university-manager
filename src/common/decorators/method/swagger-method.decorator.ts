import { Type, applyDecorators } from '@nestjs/common';
import { merge } from 'lodash';
import { OptionalField } from '../../types';
import {
  ApiBadRequestResponseGeneric,
  ApiBadRequestResponseGenericParams,
} from './api-bad-request-response-generic.decorator';
import {
  ApiConflictResponseGeneric,
  ApiConflictResponseGenericParams,
} from './api-conflict-response-generic.decorator';
import {
  ApiCreatedResponseGeneric,
  ApiCreatedResponseGenericParams,
} from './api-created-response-generic.decorator';
import {
  ApiNotFoundResponseGeneric,
  ApiNotFoundResponseGenericParams,
} from './api-not-found-response-generic.decorator';
import {
  ApiOkResponseGeneric,
  ApiOkResponseGenericParams,
} from './api-ok-response-generic.decorator';
import {
  ApiUnauthorizedResponseGeneric,
  ApiUnauthorizedResponseGenericParams,
} from './api-unauthorized-response-generic.decorator';
import { AutoSummarize } from './auto-summarize.decorator';

type TUnknown = Type<unknown>;

type SwaggerMethodParams<O extends TUnknown = any, C extends TUnknown = any> = {
  ok?: ApiOkResponseGenericParams<O>;
  created?: ApiCreatedResponseGenericParams<C>;
  badRequest?: ApiBadRequestResponseGenericParams;
  unauthorized?: ApiUnauthorizedResponseGenericParams;
  notFound?: ApiNotFoundResponseGenericParams;
  conflict?: ApiConflictResponseGenericParams;
  autoSummarize?: boolean;
};

const defaultSwaggerMethodParams: OptionalField<
  Omit<
    SwaggerMethodParams,
    'ok' | 'created' | 'badRequest' | 'unauthorized' | 'notFound' | 'conflict'
  >
> = {
  autoSummarize: true,
};

export const SwaggerMethod = <C extends TUnknown>(
  params?: SwaggerMethodParams<C>,
) => {
  const {
    ok,
    created,
    badRequest,
    unauthorized,
    notFound,
    conflict,
    autoSummarize,
  } = merge({}, defaultSwaggerMethodParams, params);
  const decorators: Array<
    ClassDecorator | MethodDecorator | PropertyDecorator
  > = [];

  if (autoSummarize) {
    decorators.push(AutoSummarize());
  }

  if (ok) {
    decorators.push(ApiOkResponseGeneric(ok));
  }

  if (created) {
    decorators.push(ApiCreatedResponseGeneric(created));
  }

  if (badRequest) {
    decorators.push(ApiBadRequestResponseGeneric(badRequest));
  }

  if (unauthorized) {
    decorators.push(ApiUnauthorizedResponseGeneric(unauthorized));
  }

  if (notFound) {
    decorators.push(ApiNotFoundResponseGeneric(notFound));
  }

  if (conflict) {
    decorators.push(ApiConflictResponseGeneric(conflict));
  }

  return applyDecorators(...decorators);
};
