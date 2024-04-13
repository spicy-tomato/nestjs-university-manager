import { Course } from '@prisma/client';
import { HttpNotFoundException } from '../../common/exceptions';

export class CourseNotFoundException extends HttpNotFoundException<Course> {
  constructor(id: string) {
    super('Course', id, 'id');
  }
}
