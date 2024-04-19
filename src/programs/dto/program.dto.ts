import { OmitType } from '@nestjs/swagger';

class Course {
  id: string;
  code: string;
  name: string;
}

class ManagementClass {
  id: string;
  code: string;
  name: string;
}

export class ProgramDto {
  id: string;
  code: string;
  name: string;
  createdAt: string;
  courses: Course[];
  managementClass: ManagementClass[];

  static query = {
    id: true,
    code: true,
    name: true,
    createdAt: true,
    courses: {
      select: {
        id: true,
        code: true,
        name: true,
      },
    },
    managementClasses: {
      select: {
        id: true,
        code: true,
        name: true,
      },
    },
  };
}

export class ProgramListItemDto extends OmitType(ProgramDto, [
  'courses',
  'managementClass',
]) {
  static query = {
    id: true,
    code: true,
    name: true,
    createdAt: true,
  };
}
