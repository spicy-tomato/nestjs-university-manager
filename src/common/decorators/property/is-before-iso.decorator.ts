import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { Duration } from 'luxon';

const defaultOptions: ValidationOptions = {
  message({ property, constraints }) {
    const [relatedPropertyName] = constraints;
    return `Field '${property}' must be less than '${relatedPropertyName}'`;
  },
};

export function IsBeforeIso(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isBeforeIso',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: { ...defaultOptions, ...validationOptions },
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          const isoValue = Duration.fromISO(value);
          const isoRelatedValue = Duration.fromISO(relatedValue);

          return (
            isoValue.isValid &&
            isoRelatedValue.isValid &&
            isoValue.valueOf() < isoRelatedValue.valueOf()
          );
        },
      },
    });
  };
}
