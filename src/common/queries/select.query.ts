import { Prisma } from '@prisma/client';
import { FindManyQuery } from '../../types';

export const academicYearQuery: FindManyQuery<Prisma.AcademicYearDelegate> = {
  id: true,
  code: true,
  name: true,
  startYear: true,
  endYear: true,
  isCurrent: true,
};

export const academicYearSimpleQuery: FindManyQuery<Prisma.AcademicYearDelegate> =
  {
    id: true,
    code: true,
    name: true,
  };

export const profileQuery: FindManyQuery<Prisma.ProfileDelegate> = {
  id: true,
  firstName: true,
  middleName: true,
  lastName: true,
};

export const managementClassListItemQuery: FindManyQuery<Prisma.ManagementClassDelegate> =
  {
    id: true,
    code: true,
    name: true,
    academicYear: { select: academicYearSimpleQuery },
  };

export const studentQuery: FindManyQuery<Prisma.StudentDelegate> = {
  id: true,
  studentId: true,
  profile: { select: profileQuery },
  managementClass: { select: managementClassListItemQuery },
};

export const studentSimpleQuery: FindManyQuery<Prisma.StudentDelegate> = {
  id: true,
  studentId: true,
  profile: { select: profileQuery },
};

export const courseListItemQuery: FindManyQuery<Prisma.CourseDelegate> = {
  id: true,
  code: true,
  name: true,
  createdAt: true,
};

export const programQuery: FindManyQuery<Prisma.ProgramDelegate> = {
  id: true,
  code: true,
  name: true,
  createdAt: true,
  courses: { select: courseListItemQuery },
  managementClasses: { select: managementClassListItemQuery },
};

export const programListItemQuery: FindManyQuery<Prisma.ProgramDelegate> = {
  id: true,
  code: true,
  name: true,
  createdAt: true,
};

export const courseQuery: FindManyQuery<Prisma.CourseDelegate> = {
  id: true,
  code: true,
  name: true,
  createdAt: true,
  programs: { select: programListItemQuery },
};

export const managementClassQuery: FindManyQuery<Prisma.ManagementClassDelegate> =
  {
    id: true,
    code: true,
    name: true,
    academicYear: { select: academicYearSimpleQuery },
    program: { select: programListItemQuery },
    students: { select: studentSimpleQuery },
  };

export const courseClassQuery: FindManyQuery<Prisma.CourseClassDelegate> = {
  id: true,
  code: true,
  name: true,
  course: { select: courseListItemQuery },
  startAt: true,
  endAt: true,
  sessionCount: true,
  isoSlots: true,
  students: { select: studentSimpleQuery },
};

export const teacherSimpleQuery: FindManyQuery<Prisma.TeacherDelegate> = {
  id: true,
  teacherId: true,
  profile: { select: profileQuery },
};

export const courseClassListItemQuery: FindManyQuery<Prisma.CourseClassDelegate> =
  {
    id: true,
    code: true,
    name: true,
    course: { select: courseListItemQuery },
    teacher: { select: teacherSimpleQuery },
    startAt: true,
    endAt: true,
    sessionCount: true,
    isoSlots: true,
  };

export const teacherQuery: FindManyQuery<Prisma.TeacherDelegate> = {
  id: true,
  teacherId: true,
  profile: { select: profileQuery },
  courseClasses: { select: courseClassListItemQuery },
};

export const sessionQuery: FindManyQuery<Prisma.SessionDelegate> = {
  id: true,
  startAt: true,
  endAt: true,
  courseClass: { select: courseClassListItemQuery },
  substituteTeacher: { select: teacherSimpleQuery },
};

export const sessionListItemQuery: FindManyQuery<Prisma.SessionDelegate> = {
  id: true,
  startAt: true,
  endAt: true,
  courseClass: { select: courseClassListItemQuery },
};

export const scoreQuery: FindManyQuery<Prisma.ScoreDelegate> = {
  id: true,
  score: true,
  courseClassId: true,
};
