import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import { ManagementClassNotFoundException } from '../management-classes/exceptions';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateUserDto,
  CreateUserProfileStudentDto,
  CreateUserProfileTeacherDto,
} from './dto';
import {
  StudentConflictException,
  TeacherConflictException,
} from './exceptions';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userRole: Role, data: CreateUserDto) {
    const creatable: Partial<Record<Role, Role[]>> = {
      SystemAdmin: ['SystemAdmin', 'Admin'],
      Admin: ['Student', 'Teacher'],
    };

    if (!creatable[userRole] || !creatable[userRole]?.includes(data.role)) {
      throw new ForbiddenException();
    }

    if (await this.findOne({ email: data.email })) {
      throw new ConflictException('This email has been registered');
    }

    if (data.role === 'Student') {
      await this.validateCreateStudent(data.profile!.student!);
    } else if (data.role === 'Teacher') {
      await this.validateCreateTeacher(data.profile!.teacher!);
    }

    const salt = await genSalt();
    const hashPassword = await hash(data.password, salt);
    data.password = hashPassword;

    const studentCreate = {
      studentId: data.profile!.student!.studentId,
      managementClassId: data.profile!.student!.managementClassId,
    };

    const teacherCreate = { teacherId: data.profile!.teacher!.teacherId };

    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        role: data.role,
        salt,
        profile: data.profile && {
          create: {
            firstName: data.profile.firstName,
            middleName: data.profile.middleName,
            lastName: data.profile.lastName,
            phoneNumber: data.profile.phoneNumber,
            isMale: data.profile.isMale,
            address: data.profile.address,
            student:
              data.role === 'Student' ? { create: studentCreate } : undefined,
            teacher:
              data.role === 'Teacher' ? { create: teacherCreate } : undefined,
          },
        },
      },
      select: {
        id: true,
        email: true,
        role: true,
        profile: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
            phoneNumber: true,
            isMale: true,
            address: true,
            student: !!data.profile!.student,
            teacher: !!data.profile!.teacher,
          },
        },
      },
    });
  }

  findByCondition() {
    return `This action returns all programs`;
  }

  findById(id: string) {
    return this.findOne({ id });
  }

  findOneWithPassword(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where });
  }

  update(id: number, updateProgramDto: Prisma.UserUpdateArgs) {
    return `This action updates a #${id} program`;
  }

  remove(id: number) {
    return `This action removes a #${id} program`;
  }

  private async findOne(where: Prisma.UserWhereUniqueInput) {
    const role = (
      await this.prisma.user.findUnique({
        where,
        select: { role: true },
      })
    )?.role;

    if (!role) {
      return null;
    }

    const studentSelect = {
      id: true,
      studentId: true,
      managementClass: {
        select: {
          id: true,
          code: true,
          name: true,
          academicYear: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    };

    const teacherSelect = {
      id: true,
      teacherId: true,
    };

    return this.prisma.user.findUnique({
      where,
      select: {
        id: true,
        email: true,
        role: true,
        profile: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
            phoneNumber: true,
            isMale: true,
            address: true,
            student: role === 'Student' ? { select: studentSelect } : undefined,
            teacher: role === 'Teacher' ? { select: teacherSelect } : undefined,
          },
        },
      },
    });
  }

  private async validateCreateStudent({
    studentId,
    managementClassId,
  }: CreateUserProfileStudentDto) {
    if (
      await this.prisma.student.findFirst({
        where: { studentId },
        select: null,
      })
    ) {
      throw new StudentConflictException(studentId, 'studentId');
    }

    if (
      !(await this.prisma.managementClass.findFirst({
        where: { id: managementClassId },
        select: null,
      }))
    ) {
      throw new ManagementClassNotFoundException(managementClassId);
    }
  }

  private async validateCreateTeacher({
    teacherId,
  }: CreateUserProfileTeacherDto) {
    if (
      await this.prisma.teacher.findFirst({
        where: { teacherId },
        select: null,
      })
    ) {
      throw new TeacherConflictException(teacherId, 'teacherId');
    }
  }
}
