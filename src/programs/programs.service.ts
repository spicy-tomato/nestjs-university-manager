import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { differenceWith } from 'lodash';
import { PrismaService } from '../prisma';
import {
  AddCoursesDto,
  CreateProgramDto,
  FindProgramDto,
  ProgramDto,
  ProgramListItemDto,
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
      select: ProgramListItemDto.query,
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
      select: ProgramListItemDto.query,
    });
  }

  async update(id: string, data: UpdateProgramDto) {
    await this.validateExist(id);

    if (
      data.code &&
      (await this.prisma.program.findFirst({
        where: {
          id: { not: id },
          code: data.code,
        },
      }))
    ) {
      throw new ProgramConflictException(data.code, 'code');
    }

    return this.prisma.program.update({
      data,
      where: { id },
      select: ProgramListItemDto.query,
    });
  }

  async remove(id: string) {
    await this.validateExist(id);

    return this.prisma.program.delete({
      where: { id },
      select: ProgramListItemDto.query,
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

      await tx.course.updateMany({
        where: { id: { in: toAddProgramCourseIds } },
        data: { programIds: { push: programId } },
      });
    });

    return await this.findById(programId);
  }

  private async findOne(where: Prisma.ProgramWhereUniqueInput) {
    return this.prisma.program.findUnique({
      where,
      select: ProgramDto.query,
    });
  }

  private async validateExist(id: string): Promise<void> {
    if (!(await this.findById(id))) {
      throw new ProgramNotFoundException(id);
    }
  }
}
