import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma';
import { ChangeSessionRequestDto } from './dto';
import { UpdateChangeSessionRequestDto } from './dto/update-change-session-request.dto';
import { ChangeSessionRequestNotFoundException } from './exceptions';

@Injectable()
export class ChangeSessionRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  findByCondition() {
    return `This action returns all changeSessionRequests`;
  }

  findById(id: string) {
    return this.findOne({ id });
  }

  async update(id: string, data: UpdateChangeSessionRequestDto) {
    var request = await this.findById(id);
    if (!request) {
      throw new ChangeSessionRequestNotFoundException(id);
    }

    if (request.status !== 'Pending') {
      throw new BadRequestException(
        "Update function is only available for status 'Pending'",
      );
    }

    return this.prisma.changeSessionRequest.update({
      where: { id },
      data: {
        newStartAt: data.startAt,
        newEndAt: data.endAt,
        substituteTeacherId: data.substituteTeacherId,
      },
      select: ChangeSessionRequestDto.query,
    });
  }

  async approve(id: string) {
    var request = await this.findById(id);
    if (!request) {
      throw new ChangeSessionRequestNotFoundException(id);
    }

    if (request.status !== 'Pending') {
      throw new BadRequestException(
        "Approve function is only available for status 'Pending'",
      );
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.changeSessionRequest.update({
        where: { id },
        data: { status: 'Approved' },
        select: null,
      });

      await tx.session.update({
        where: { id: request!.sessionId },
        data: {
          startAt: request!.newStartAt,
          endAt: request!.newEndAt,
          substituteTeacherId: request!.substituteTeacherId,
        },
      });
    });

    return this.findById(id);
  }

  async cancel(id: string) {
    var request = await this.findById(id);
    if (!request) {
      throw new ChangeSessionRequestNotFoundException(id);
    }

    if (request.status !== 'Pending') {
      throw new BadRequestException(
        "Cancel function is only available for status 'Pending'",
      );
    }

    return this.prisma.changeSessionRequest.update({
      where: { id },
      data: { status: 'Cancelled' },
      select: ChangeSessionRequestDto.query,
    });
  }

  async reject(id: string) {
    var request = await this.findById(id);
    if (!request) {
      throw new ChangeSessionRequestNotFoundException(id);
    }

    if (request.status !== 'Pending') {
      throw new BadRequestException(
        "Reject function is only available for status 'Pending'",
      );
    }

    return this.prisma.changeSessionRequest.update({
      where: { id },
      data: { status: 'Rejected' },
      select: ChangeSessionRequestDto.query,
    });
  }

  private async findOne(where: Prisma.ChangeSessionRequestWhereUniqueInput) {
    return this.prisma.changeSessionRequest.findUnique({
      where,
      select: ChangeSessionRequestDto.query,
    });
  }
}
