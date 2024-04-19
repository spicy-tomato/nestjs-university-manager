import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AcademicYearNotFoundException } from '../academic-years/exceptions';
import { PrismaService } from '../prisma';
import {
  CreateManagementClassDto,
  FindManagementClassDto,
  ManagementClassDto,
  ManagementClassListItemDto,
  UpdateManagementClassDto,
} from './dto';
import {
  ManagementClassConflictException,
  ManagementClassNotFoundException,
} from './exceptions';

@Injectable()
export class ManagementClassesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateManagementClassDto) {
    if (await this.findOne({ code: data.code })) {
      throw new ManagementClassConflictException(data.code, 'code');
    }

    await this.validateAcademicYearId(data.academicYearId);

    return this.prisma.managementClass.create({
      data,
      select: ManagementClassListItemDto.query,
    });
  }

  findByCondition(q: FindManagementClassDto) {
    return this.prisma.managementClass.findMany({
      where: {
        code: { contains: q.code },
        name: { contains: q.name },
      },
      select: ManagementClassListItemDto.query,
    });
  }

  findById(id: string) {
    return this.findOne({ id });
  }

  async update(id: string, data: UpdateManagementClassDto) {
    await this.validateExist(id);

    await this.validateAcademicYearId(data.academicYearId);

    if (data.code && (await this.findOne({ code: data.code }))) {
      throw new ManagementClassConflictException(data.code, 'code');
    }

    return this.prisma.managementClass.update({
      where: { id },
      data,
      select: ManagementClassListItemDto.query,
    });
  }

  async remove(id: string) {
    await this.validateExist(id);

    return this.prisma.managementClass.delete({
      where: { id },
    });
  }

  private async findOne(where: Prisma.ManagementClassWhereUniqueInput) {
    return this.prisma.managementClass.findUnique({
      where,
      select: ManagementClassDto.query,
    });
  }

  private async validateExist(id: string): Promise<void> {
    if (!(await this.findById(id))) {
      throw new ManagementClassNotFoundException(id);
    }
  }

  private async validateAcademicYearId(academicYearId?: string): Promise<void> {
    if (academicYearId === undefined) {
      return;
    }

    if (
      !(await this.prisma.academicYear.findFirst({
        where: { id: academicYearId },
        select: { id: true },
      }))
    ) {
      throw new AcademicYearNotFoundException(academicYearId);
    }
  }
}
