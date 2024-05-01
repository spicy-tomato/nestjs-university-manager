import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma';
import { FindScoreQuery } from '../scores/queries';
import { ScoresService } from '../scores/scores.service';
import {
  FindStudentDto,
  StudentDto,
  StudentScoreDto,
  StudentSimpleDto,
} from './dto';
import { StudentNotFoundException } from './exceptions';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly scoreService: ScoresService,
  ) {}

  findByCondition(q: FindStudentDto) {
    return this.prisma.student.findMany({
      where: {
        studentId: { contains: q.studentId },
      },
      select: StudentSimpleDto.query,
    });
  }

  findById(id: string) {
    return this.findOne({ id });
  }

  async remove(id: string) {
    await this.validateExist(id);

    return this.prisma.student.delete({
      where: { id },
      select: StudentSimpleDto.query,
    });
  }

  async getScores(
    studentId: string,
    q: FindScoreQuery,
  ): Promise<StudentScoreDto[]> {
    return this.scoreService.findByStudentId(studentId, q);
  }

  private async findOne(where: Prisma.StudentWhereUniqueInput) {
    return this.prisma.student.findUnique({
      where,
      select: StudentDto.query,
    });
  }

  private async validateExist(id: string): Promise<void> {
    if (!(await this.findById(id))) {
      throw new StudentNotFoundException(id);
    }
  }
}
