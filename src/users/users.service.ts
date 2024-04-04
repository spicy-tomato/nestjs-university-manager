import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly users: any[] = [
    {
      id: '1',
      username: 'username1',
      password: 'pwd1',
      roles: 'Admin',
    },
    {
      id: '2',
      username: 'username2',
      password: 'pwd2',
      roles: 'Student',
    },
  ];

  async findOne(username: string): Promise<any | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
