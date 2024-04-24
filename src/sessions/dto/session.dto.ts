class CourseClass {
  id: string;
  code: string;
  name: string;
}

class TeacherProfile {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
}

class Teacher {
  id: string;
  teacherId: string;
  profile: TeacherProfile;
}

export class SessionDto {
  id: string;
  courseClass: CourseClass;
  startAt: string;
  endAt: string;
  substituteTeacher?: Teacher;

  static query = {
    id: true,
    courseClass: {
      select: {
        id: true,
        code: true,
        name: true,
      },
    },
    substituteTeacher: {
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
  };
}
