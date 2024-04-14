import { Slot } from '@prisma/client';
import { first } from 'lodash';
import { DateTime, Duration } from 'luxon';
import { CreateCourseClassSlotDto } from '../../course-classes/dto';
import { GenericSlot } from '../dto';

export class DateHelper {
  static generateSessions(
    startAt: string,
    count: number,
    slots: CreateCourseClassSlotDto[],
  ): GenericSlot<string>[] {
    const isoSlots: GenericSlot<Duration>[] = slots.map((slot) => ({
      startAt: Duration.fromISO(slot.startAt),
      endAt: Duration.fromISO(slot.endAt),
    }));

    let slot: GenericSlot<DateTime>;

    const result: GenericSlot<string>[] = [];

    for (let i = 0; i < count; i++) {
      slot = this.nextSlot(
        slot?.startAt ?? DateTime.fromISO(startAt),
        isoSlots,
        i > 0,
      );

      result.push({
        startAt: slot.startAt.toISO(),
        endAt: slot.endAt.toISO(),
      });
    }

    return result;
  }

  static nextSlot(
    date: DateTime,
    slot: GenericSlot<Duration> | GenericSlot<Duration>[],
    excludeToday = false,
  ): GenericSlot<DateTime> {
    if (Array.isArray(slot)) {
      const nextDays = slot.map((s) => this.nextSlot(date, s, excludeToday));
      nextDays.sort((a, b) =>
        a.startAt.valueOf() < b.startAt.valueOf() ? -1 : 1,
      );
      return first(nextDays);
    }

    if (
      date.weekday < slot.startAt.days ||
      (date.weekday === slot.startAt.days && !excludeToday)
    ) {
      return {
        startAt: date.set({
          weekday: slot.startAt.days,
          hour: slot.startAt.hours,
          minute: slot.startAt.minutes,
          second: 0,
          millisecond: 0,
        }),
        endAt: date.set({
          weekday: slot.endAt.days,
          hour: slot.endAt.hours,
          minute: slot.endAt.minutes,
          second: 0,
          millisecond: 0,
        }),
      };
    }

    return {
      startAt: date.plus({ week: 1 }).set({
        weekday: slot.startAt.days,
        hour: slot.startAt.hours,
        minute: slot.startAt.minutes,
        second: 0,
        millisecond: 0,
      }),
      endAt: date.plus({ week: 1 }).set({
        weekday: slot.endAt.days,
        hour: slot.endAt.hours,
        minute: slot.endAt.minutes,
        second: 0,
        millisecond: 0,
      }),
    };
  }

  static isValidIsoSlot(isoSlot: Slot): boolean {
    const isValidIsoSlotTime = (d: Duration): boolean =>
      d.isValid && d.years === 0 && d.months === 0 && d.days < 7;
    const isoStartAt = Duration.fromISO(isoSlot.startAt);
    const isoEndAt = Duration.fromISO(isoSlot.endAt);

    return (
      isValidIsoSlotTime(isoStartAt) &&
      isValidIsoSlotTime(isoEndAt) &&
      isoStartAt.valueOf() < isoEndAt.valueOf()
    );
  }
}
