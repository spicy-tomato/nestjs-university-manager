import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userRole: Role, data: CreateUserDto) {
    const creatable: Partial<Record<Role, Role[]>> = {
      SystemAdmin: ['SystemAdmin', 'Admin'],
      Admin: ['Student', 'Teacher'],
    };

    if (!creatable[userRole] || !creatable[userRole].includes(data.role)) {
      throw new ForbiddenException();
    }

    if (await this.findOne({ email: data.email })) {
      throw new ConflictException('This email has been registered');
    }

    const salt = await genSalt();
    const hashPassword = await hash(data.password, salt);
    data.password = hashPassword;

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
          },
        },
      },
      select: {
        id: true,
        email: true,
        role: true,
        profile: true,
      },
    });
  }

  findAll() {
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

  private findOne(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where,
      select: {
        id: true,
        email: true,
        role: true,
        profile: true,
      },
    });
  }
}
