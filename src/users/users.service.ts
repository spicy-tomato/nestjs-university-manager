import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { $Enums, Prisma } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userRole: $Enums.Role, data: CreateUserDto) {
    const creatable: Partial<Record<$Enums.Role, $Enums.Role[]>> = {
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
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
  }

  findAll() {
    return `This action returns all programs`;
  }

  findOne(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where });
  }

  update(id: number, updateProgramDto: Prisma.UserUpdateArgs) {
    return `This action updates a #${id} program`;
  }

  remove(id: number) {
    return `This action removes a #${id} program`;
  }

  private _createUser(data: CreateUserDto) {}
}
