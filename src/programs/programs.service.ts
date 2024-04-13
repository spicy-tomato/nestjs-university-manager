import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { differenceWith } from 'lodash';
import { PrismaService } from '../prisma';
import {
  AddCoursesDto,
  CreateProgramDto,
  FindProgramDto,
  UpdateProgramDto,
} from './dto';
import {
  ProgramConflictException,
  ProgramNotFoundException,
} from './exceptions';

@Injectable()
export class ProgramsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProgramDto) {
    if (await this.findOne({ code: data.code })) {
      throw new ProgramConflictException(data.code, 'code');
    }

    return this.prisma.program.create({
      data: {
        code: data.code,
        name: data.name,
        deletedAt: null,
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

  findByCondition(q: FindProgramDto) {
    return this.prisma.program.findMany({
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

  async update(id: string, data: UpdateProgramDto) {
    await this.validateExist(id);

    if (
      await this.prisma.program.findFirst({
        where: {
          id: { not: id },
          code: data.code,
        },
      })
    ) {
      throw new ProgramConflictException(data.code, 'code');
    }

    return this.prisma.program.update({
      data,
      where: { id },
      select: {
        id: true,
        code: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async remove(id: string) {
    await this.validateExist(id);

    return this.prisma.program.delete({
      where: { id },
    });
  }

  async addCourses(programId: string, data: AddCoursesDto) {
    const courseIds = data.courses;

    const program = await this.prisma.program.findUnique({
      where: { id: programId },
      select: {
        courses: {
          select: {
            id: true,
            programIds: true,
          },
        },
      },
    });
    if (!program) {
      throw new ProgramNotFoundException(programId);
    }

    const toRemoveProgramCourses = differenceWith(
      program.courses,
      courseIds,
      (oldCourse, newCourseId) => oldCourse.id === newCourseId,
    );

    const toAddProgramCourseIds = differenceWith(
      courseIds,
      program.courses,
      (newCourseId, oldCourse) => oldCourse.id === newCourseId,
    );

    await this.prisma.$transaction(async (tx) => {
      await Promise.all(
        toRemoveProgramCourses.map((course) =>
          tx.course.update({
            where: { id: course.id },
            select: null,
            data: {
              programIds: course.programIds.filter((pid) => pid !== programId),
            },
          }),
        ),
      );

      await tx.program.update({
        where: { id: programId },
        select: null,
        data: { courseIds },
      });

      await Promise.all(
        toAddProgramCourseIds.map((courseId) =>
          tx.course.update({
            where: { id: courseId },
            data: {
              programIds: { push: programId },
            },
          }),
        ),
      );
    });

    return await this.findById(programId);
  }

  private async findOne(where: Prisma.ProgramWhereUniqueInput) {
    return this.prisma.program.findUnique({
      where,
      select: {
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
        managementClasses: true,
      },
    });
  }

  private async validateExist(id: string): Promise<void> {
    if (!(await this.findById(id))) {
      throw new ProgramNotFoundException(id);
    }
  }
}
