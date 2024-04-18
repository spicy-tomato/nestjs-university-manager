import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import {
  AcademicYearConflictException,
  AcademicYearNotFoundException,
} from './exceptions';

@Injectable()
export class AcademicYearsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAcademicYearDto) {
    const { startYear } = data;
    const endYear = startYear + 1;

    if (await this.findByStartYear(startYear)) {
      throw new AcademicYearConflictException(startYear, 'startYear');
    }

    return this.prisma.academicYear.create({
      data: {
        name: `${startYear} - ${endYear}`,
        startYear: startYear,
        endYear: startYear + 1,
        code: `${startYear % 100}-${endYear % 100}`,
        isCurrent: false,
      },
    });
  }

  findInRange(startYear?: number, endYear?: number) {
    return this.prisma.academicYear.findMany({
      where: {
        startYear: { gte: startYear },
        endYear: { lte: endYear },
      },
      orderBy: { startYear: 'asc' },
    });
  }

  async updateCurrent(id: string) {
    if (!(await this.findById(id))) {
      throw new AcademicYearNotFoundException(id);
    }

    const current = await this.getCurrent();

    if (id === current?.id) {
      return current;
    }

    await this.prisma.$transaction(async (tx) => {
      if (current) {
        await this.prisma.academicYear.update({
          data: { isCurrent: false },
          where: { id: current.id },
        });
      }

      await this.prisma.academicYear.update({
        data: { isCurrent: true },
        where: { id },
        select: {
          id: true,
          code: true,
          name: true,
          startYear: true,
          endYear: true,
          isCurrent: true,
        },
      });
    });

    return true;
  }

  async remove(id: string) {
    const existedItem = await this.findById(id);
    if (!existedItem) {
      throw new AcademicYearNotFoundException(id);
    }
    if (existedItem.isCurrent) {
      throw new BadRequestException('Cannot delete current academic year');
    }
    return this.prisma.academicYear.delete({ where: { id } });
  }

  getCurrent() {
    return this.prisma.academicYear.findFirst({
      where: { isCurrent: true },
      select: {
        id: true,
        code: true,
        name: true,
        startYear: true,
        endYear: true,
        isCurrent: true,
      },
    });
  }

  findById(id: string) {
    return this.findOne({ id });
  }

  findByStartYear(startYear: number) {
    return this.findOne({ startYear });
  }

  private findOne(where: Prisma.AcademicYearWhereUniqueInput) {
    return this.prisma.academicYear.findUnique({
      where,
      select: {
        id: true,
        code: true,
        name: true,
        startYear: true,
        endYear: true,
        isCurrent: true,
      },
    });
  }
}
