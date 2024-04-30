import { BadRequestException, Injectable } from '@nestjs/common';
import { groupBy } from 'lodash';
import { AcademicYearSimpleDto } from '../academic-years/dto';
import { PrismaService } from '../prisma';
import { StudentNotFoundException } from '../students/exceptions';
import { ScoreDto } from './dto/score.dto';
import { FindScoreQuery } from './queries';

@Injectable()
export class ScoresService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string, q: FindScoreQuery) {
    const studentUser = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        profile: {
          select: {
            student: { select: { id: true } },
          },
        },
      },
    });

    const studentId = studentUser?.profile?.student?.id;
    if (studentId) {
      return this.findByStudentId(studentId, q);
    }
    throw new BadRequestException(`Cannot find student with user ID ${userId}`);
  }

  async findByStudentId(studentId: string, q: FindScoreQuery) {
    const studentWithClasses = await this.prisma.student.findUnique({
      where: { id: studentId },
      select: {
        courseClasses: {
          select: {
            id: true,
            code: true,
            name: true,
            academicYear: { select: AcademicYearSimpleDto.query },
          },
          orderBy: { academicYear: { code: 'desc' } },
        },
      },
    });
    if (!studentWithClasses) {
      throw new StudentNotFoundException(studentId);
    }
    const classes = studentWithClasses.courseClasses;

    const scores = await this.prisma.score.findMany({
      where: {
        studentId,
        courseClass: { academicYearId: q.academicYearId },
      },
      select: ScoreDto.query,
    });
    const groupedScores = groupBy(scores, 'courseClassId');

    return classes.map((courseClass) => ({
      ...courseClass,
      scores: groupedScores[courseClass.id] ?? [],
    }));
  }
}
