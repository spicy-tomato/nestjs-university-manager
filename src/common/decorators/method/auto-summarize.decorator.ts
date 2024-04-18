import { startCase } from 'lodash';

export const AutoSummarize = (): MethodDecorator => {
  return (
    _: object,
    key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>,
  ): any => {
    if (typeof key === 'string') {
      const summary = startCase(key);

      Reflect.defineMetadata(
        'swagger/apiOperation',
        { summary },
        descriptor.value,
      );
    }

    return descriptor;
  };
};
