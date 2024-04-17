import { registerDecorator, ValidationOptions } from 'class-validator';
import { Duration } from 'luxon';

const defaultOptions: ValidationOptions = {
  message({ property }) {
    return `Slot of field '${property}' must be valid ISO 8601 duration (0 <= duration < 7d)'`;
  },
};

export function IsIso8601Duration(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isIso8601Slot',
      target: object.constructor,
      propertyName: propertyName,
      options: { ...defaultOptions, ...validationOptions },
      validator: {
        validate(value: any) {
          const {
            isValid,
            years,
            months,
            days,
            hours,
            minutes,
            seconds,
            milliseconds,
          } = Duration.fromISO(value);

          return (
            isValid &&
            years === 0 &&
            months === 0 &&
            1 <= days &&
            days <= 7 &&
            0 <= hours &&
            0 <= minutes &&
            seconds === 0 &&
            milliseconds === 0
          );
        },
      },
    });
  };
}
