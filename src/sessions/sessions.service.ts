import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma';
import { FindSessionDto, SessionListItemDto } from './dto';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByCondition(q: FindSessionDto, role: Role, userId: string) {
    if (role === 'Admin') {
      return this.prisma.session.findMany({
        where: {
          courseClassId: q.courseClassId,
          substituteTeacherId: q.substituteTeacherId,
          startAt: {
            gte: q.from,
            lte: q.to,
          },
        },
        select: SessionListItemDto.query,
      });
    }

    if (role === 'Teacher') {
      const teacher = await this.prisma.teacher.findFirst({
        where: { profile: { userId } },
      });

      if (!teacher) {
        throw new InternalServerErrorException();
      }

      return this.prisma.session.findMany({
        where: {
          courseClassId: q.courseClassId,
          substituteTeacherId: q.substituteTeacherId,
          startAt: {
            gte: q.from,
            lte: q.to,
          },
          courseClass: { teacherId: teacher.id },
        },
        select: SessionListItemDto.query,
      });
    }

    const student = await this.prisma.student.findFirst({
      where: { profile: { userId } },
    });

    if (!student) {
      throw new InternalServerErrorException();
    }

    return this.prisma.session.findMany({
      where: {
        courseClassId: q.courseClassId,
        substituteTeacherId: q.substituteTeacherId,
        startAt: {
          gte: q.from,
          lte: q.to,
        },
        courseClass: { studentIds: { has: student.id } },
      },
      select: SessionListItemDto.query,
    });
  }

  async findOne(id: string, role: Role, userId: string) {
    if (role === 'Admin') {
      return this.prisma.session.findMany({
        where: { id },
        select: SessionListItemDto.query,
      });
    }

    if (role === 'Teacher') {
      const teacher = await this.prisma.teacher.findFirst({
        where: { profile: { userId } },
        select: { id: true },
      });

      if (!teacher) {
        throw new InternalServerErrorException();
      }

      return this.prisma.session.findMany({
        where: {
          id,
          courseClass: { teacherId: teacher.id },
        },
        select: SessionListItemDto.query,
      });
    }
  }
}
