import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import ObjectID from 'bson-objectid';
import { Duration } from 'luxon';
import { DateHelper } from '../common/helpers';
import { CourseNotFoundException } from '../courses/exceptions';
import { PrismaService } from '../prisma';
import {
  CreateCourseClassDto,
  FindCourseClassDto,
  UpdateCourseClassDto,
} from './dto';
import { CourseClassConflictException } from './exceptions';

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
        select: {
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
        },
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

  findAll(q: FindCourseClassDto) {
    return this.prisma.courseClass.findMany({
      where: {
        code: { contains: q.code },
        name: { contains: q.name },
      },
      select: {
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
      },
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

  private async findOne(where: Prisma.CourseClassWhereUniqueInput) {
    return this.prisma.courseClass.findUnique({
      where,
      select: {
        id: true,
        code: true,
        name: true,
        startAt: true,
        endAt: true,
        course: {
          select: {
            id: true,
            code: true,
            name: true,
          },
        },
        isoSlots: true,
        students: {
          select: {
            profile: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
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
