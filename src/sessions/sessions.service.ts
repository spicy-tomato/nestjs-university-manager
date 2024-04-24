import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { FindSessionDto, SessionDto } from './dto';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  findByCondition(q: FindSessionDto) {
    return this.prisma.session.findMany({
      where: {
        courseClassId: q.courseClassId,
        substituteTeacherId: q.substituteTeacherId,
      },
      select: SessionDto.query,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
