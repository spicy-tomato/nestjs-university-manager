import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import ObjectID from 'bson-objectid';
import { difference } from 'lodash';
import { Duration } from 'luxon';
import { DateHelper } from '../common/helpers';
import { CourseNotFoundException } from '../courses/exceptions';
import { PrismaService } from '../prisma';
import {
  CourseClassDto,
  CourseClassListItemDto,
  CreateCourseClassDto,
  FindCourseClassDto,
  UpdateCourseClassDto,
  UpdateCourseClassStudentsListDto,
} from './dto';
import {
  CourseClassConflictException,
  CourseClassNotFoundException,
} from './exceptions';

@Injectable()
export class CourseClassesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCourseClassDto) {
    if (await this.findOne({ code: data.code })) {
      throw new CourseClassConflictException(data.code, 'code');
    }

    await this.validateCourseId(data.courseId);

    const id = ObjectID().toHexString();

    data.isoSlots.sort((a, b) =>
      Duration.fromISO(a.startAt).valueOf() <
      Duration.fromISO(b.startAt).valueOf()
        ? -1
        : 1,
    );

    const sessions = DateHelper.generateSessions(
      data.startAt,
      data.sessionCount,
      data.isoSlots,
    ).map((x) => ({ ...x, courseClassId: id }));

    await this.prisma.$transaction(async (tx) => {
      await tx.courseClass.create({
        data: {
          id,
          ...data,
        },
        select: CourseClassListItemDto.query,
      });

      await Promise.all(
        sessions.map((session) =>
          tx.session.create({
            data: session,
            select: null,
          }),
        ),
      );
    });

    return this.findById(id);
  }

  findByCondition(q: FindCourseClassDto) {
    return this.prisma.courseClass.findMany({
      where: {
        code: { contains: q.code },
        name: { contains: q.name },
      },
      select: CourseClassListItemDto.query,
    });
  }

  findById(id: string) {
    return this.findOne({ id });
  }

  update(id: string, data: UpdateCourseClassDto) {
    return `This action updates a #${id} courseClass`;
  }

  remove(id: string) {
    return `This action removes a #${id} courseClass`;
  }

  async getSessions(id: string) {
    if (!this.findById(id)) {
      throw new CourseClassNotFoundException(id);
    }

    const sessions = await this.prisma.session.findMany({
      where: { courseClassId: id },
      select: {
        id: true,
        startAt: true,
        endAt: true,
        substituteTeacher: true,
      },
    });

    return sessions;
  }

  async updateStudentsList(
    id: string,
    { studentIds }: UpdateCourseClassStudentsListDto,
  ) {
    const courseClass = await this.prisma.courseClass.findUnique({
      where: { id },
      select: { studentIds: true },
    });
    if (!courseClass) {
      throw new CourseClassNotFoundException(id);
    }

    const studentIdsToAdd = difference(studentIds, courseClass.studentIds);
    const studentIdsToRemove = difference(courseClass.studentIds, studentIds);

    const studentsToRemove = await this.prisma.student.findMany({
      where: {
        id: { in: studentIdsToRemove },
      },
      select: {
        id: true,
        courseClassIds: true,
      },
    });

    await this.prisma.$transaction(async (tx) => {
      await tx.courseClass.update({
        where: { id },
        data: { studentIds },
      });

      await Promise.all(
        studentIdsToAdd.map((sid) =>
          tx.student.update({
            where: { id: sid },
            data: {
              courseClassIds: { push: id },
            },
          }),
        ),
      );

      await Promise.all(
        studentsToRemove.map((student) =>
          tx.student.update({
            where: { id: student.id },
            data: {
              courseClassIds: student.courseClassIds.filter(
                (cid) => cid !== id,
              ),
            },
          }),
        ),
      );
    });

    return await this.findById(id);
  }

  private async findOne(where: Prisma.CourseClassWhereUniqueInput) {
    return this.prisma.courseClass.findUnique({
      where,
      select: CourseClassDto.query,
    });
  }

  private async validateCourseId(courseId: string): Promise<void> {
    if (
      !(await this.prisma.course.findFirst({
        where: { id: courseId },
        select: { id: true },
      }))
    ) {
      throw new CourseNotFoundException(courseId);
    }
  }
}
