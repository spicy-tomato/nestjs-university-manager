import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma';
import { CreateProgramDto } from './dto/create-program.dto';
import { FindProgramDto } from './dto/find-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
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
      select: {
        id: true,
        code: true,
        name: true,
        createdAt: true,
      },
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
      select: {
        id: true,
        code: true,
        name: true,
        createdAt: true,
        managementClasses: true,
        courseIds: true
      }
    });
  }

  async update(id: string, data: UpdateProgramDto) {
    if (!(await this.findById(id))) {
      throw new ProgramNotFoundException(id);
    }

    if (
      await this.prisma.program.findFirst({
        where: {
          id: { not: id },
          code: data.code,
        },
      })
    ) {
      throw new ProgramConflictException(data.code, 'code');
    }

    return this.prisma.program.update({
      data,
      where: { id },
      select: {
        id: true,
        code: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async remove(id: string) {
    if (!(await this.findById(id))) {
      throw new ProgramNotFoundException(id);
    }

    return this.prisma.program.delete({
      where: { id },
    });
  }

  private findOne(where: Prisma.ProgramWhereUniqueInput) {
    return this.prisma.program.findUnique({ where });
  }
}
