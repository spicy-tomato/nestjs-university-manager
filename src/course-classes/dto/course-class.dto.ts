export class CourseClassSlotDto {
  startAt: string;
  endAt: string;
}

export class CourseClassDto {
  id: string;
  code: string;
  name: string;
  course: {
    id: string;
    code: string;
    name: string;
  };
  startAt: string;
  endAt?: string;
  sessionCount: number;
  isoSlots: CourseClassSlotDto[];
}
