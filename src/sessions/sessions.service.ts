import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import {
  ChangeSessionRequestDto,
  CreateChangeSessionRequestDto,
} from '../change-session-requests/dto';
import { PrismaService } from '../prisma';
import { FindSessionDto, SessionDto, SessionListItemDto } from './dto';
import { SessionNotFoundException } from './exceptions';

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
      return this.prisma.session.findFirst({
        where: { id },
        select: SessionDto.query,
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

      return this.prisma.session.findFirst({
        where: {
          id,
          courseClass: { teacherId: teacher.id },
        },
        select: SessionDto.query,
      });
    }

    const student = await this.prisma.student.findFirst({
      where: { profile: { userId } },
    });

    if (!student) {
      throw new InternalServerErrorException();
    }

    return this.prisma.session.findFirst({
      where: {
        id,
        courseClass: { studentIds: { has: student.id } },
      },
      select: SessionDto.query,
    });
  }

  async createChangeRequest(id: string, data: CreateChangeSessionRequestDto) {
    const session = await this.prisma.session.findUnique({
      where: { id },
      select: {
        startAt: true,
        endAt: true,
        changeSessionRequests: {
          select: { status: true },
        },
      },
    });

    if (!session) {
      throw new SessionNotFoundException(id);
    }

    if (session.changeSessionRequests.some((r) => r.status === 'Pending')) {
      throw new BadRequestException(
        'This session has pending request. Please resolve it before create another one.',
      );
    }

    return this.prisma.changeSessionRequest.create({
      data: {
        sessionId: id,
        oldStartAt: session.startAt,
        oldEndAt: session.endAt,
        newStartAt: data.startAt,
        newEndAt: data.endAt,
        status: 'Pending',
        substituteTeacherId: data.substituteTeacherId,
      },
      select: ChangeSessionRequestDto.query,
    });
  }
}
