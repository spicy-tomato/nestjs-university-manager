import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma';
import { FindTeacherDto, TeacherDto, TeacherSimpleDto } from './dto';
import { TeacherNotFoundException } from './exceptions';

@Injectable()
export class TeachersService {
  constructor(private readonly prisma: PrismaService) {}

  findByCondition(q: FindTeacherDto) {
    return this.prisma.teacher.findMany({
      where: {
        teacherId: { contains: q.teacherId },
      },
      select: TeacherSimpleDto.query,
    });
  }

  findById(id: string) {
    return this.findOne({ id });
  }

  async remove(id: string) {
    await this.validateExist(id);

    return this.prisma.teacher.delete({
      where: { id },
      select: TeacherSimpleDto.query,
    });
  }

  private async findOne(where: Prisma.TeacherWhereUniqueInput) {
    return this.prisma.teacher.findUnique({
      where,
      select: TeacherDto.query,
    });
  }

  private async validateExist(id: string): Promise<void> {
    if (!(await this.findById(id))) {
      throw new TeacherNotFoundException(id);
    }
  }
}
