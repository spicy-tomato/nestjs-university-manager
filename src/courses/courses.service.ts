import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { differenceWith } from 'lodash';
import { PrismaService } from '../prisma';
import { CreateCourseDto, FindCourseDto, UpdateCourseDto } from './dto';
import { CourseConflictException, CourseNotFoundException } from './exceptions';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCourseDto) {
    if (await this.findOne({ code: data.code })) {
      throw new CourseConflictException(data.code, 'code');
    }

    await this.validateProgramIds(data.programIds);

    return this.prisma.course.create({
      data: {
        code: data.code,
        name: data.name,
        programIds: data.programIds,
        deletedAt: null,
      },
      select: {
        id: true,
        code: true,
        name: true,
        createdAt: true,
        programs: {
          select: {
            id: true,
            code: true,
            name: true,
          },
        },
      },
    });
  }

  findAll(q: FindCourseDto) {
    return this.prisma.course.findMany({
      where: {
        code: { contains: q.code },
        name: { contains: q.name },
      },
      select: {
        id: true,
        code: true,
        name: true,
        createdAt: true,
      },
    });
  }

  findById(id: string) {
    return this.findOne({ id });
  }

  async update(id: string, data: UpdateCourseDto) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      select: {
        programs: {
          select: {
            id: true,
            courseIds: true,
          },
        },
      },
    });
    if (!course) {
      throw new CourseNotFoundException(id);
    }

    if (
      await this.prisma.course.findFirst({
        where: {
          id: { not: id },
          code: data.code,
        },
      })
    ) {
      throw new CourseConflictException(data.code, 'code');
    }

    await this.validateProgramIds(data.programIds);

    const toRemoveCoursePrograms = differenceWith(
      course.programs,
      data.programIds,
      (oldProgram, newProgramId) => oldProgram.id === newProgramId,
    );

    const toAddCourseProgramIds = differenceWith(
      data.programIds,
      course.programs,
      (newProgramId, oldProgram) => oldProgram.id === newProgramId,
    );

    await this.prisma.$transaction(async (tx) => {
      await Promise.all(
        toRemoveCoursePrograms.map((program) =>
          tx.program.update({
            where: { id: program.id },
            data: {
              courseIds: program.courseIds.filter((cid) => cid !== id),
            },
            select: null,
          }),
        ),
      );

      await tx.course.update({
        data,
        where: { id },
        select: null,
      });

      await Promise.all(
        toAddCourseProgramIds.map((programId) =>
          tx.program.update({
            where: { id: programId },
            data: {
              courseIds: { push: id },
            },
          }),
        ),
      );
    });

    return await this.findById(id);
  }

  async remove(id: string) {
    await this.validateExist(id);

    return this.prisma.course.delete({
      where: { id },
    });
  }

  private async findOne(where: Prisma.CourseWhereUniqueInput) {
    return this.prisma.course.findUnique({
      where,
      select: {
        id: true,
        code: true,
        name: true,
        createdAt: true,
        programs: {
          select: {
            id: true,
            code: true,
            name: true,
          },
        },
      },
    });
  }

  private async validateExist(id: string): Promise<void> {
    if (!(await this.findById(id))) {
      throw new CourseNotFoundException(id);
    }
  }

  private async validateProgramIds(programIds: string[]): Promise<void> {
    for (const pid of programIds) {
      if (
        !(await this.prisma.program.findFirst({
          where: { id: pid },
          select: { id: true },
        }))
      ) {
        throw new CourseNotFoundException(pid);
      }
    }
  }
}
