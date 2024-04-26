import { OmitType } from '@nestjs/swagger';

class StudentProfileDto {
  id: string;
  firstName: string;
  lastName: string;
}

class StudentDto {
  profile: StudentProfileDto;
}

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
  students: StudentDto[];

  static query = {
    id: true,
    code: true,
    name: true,
    course: {
      select: {
        id: true,
        code: true,
        name: true,
      },
    },
    startAt: true,
    endAt: true,
    sessionCount: true,
    isoSlots: true,
    students: {
      select: {
        id: true,
        studentId: true,
        profile: {
          select: {
            firstName: true,
            middleName: true,
            lastName: true,
          },
        },
      },
    },
  };
}

export class CourseClassListItemDto extends OmitType(CourseClassDto, [
  'students',
]) {
  static query = {
    id: true,
    code: true,
    name: true,
    course: {
      select: {
        id: true,
        code: true,
        name: true,
      },
    },
    teacher: {
      select: {
        id: true,
        teacherId: true,
        profile: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
          },
        },
      },
    },
    startAt: true,
    endAt: true,
    sessionCount: true,
    isoSlots: true,
  };
}
