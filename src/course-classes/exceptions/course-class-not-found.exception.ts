import { CourseClass } from '@prisma/client';
import { HttpNotFoundException } from '../../common/exceptions';

export class CourseClassNotFoundException extends HttpNotFoundException<CourseClass> {
  constructor(id: string) {
    super('CourseClass', id, 'id');
  }
}
