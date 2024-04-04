import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly users: any[] = [
    {
      id: '1',
      email: 'email1',
      password: 'pwd1',
      roles: 'Admin',
    },
    {
      id: '2',
      email: 'email2',
      password: 'pwd2',
      roles: 'Student',
    },
  ];

  async findOne(email: string): Promise<any | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
