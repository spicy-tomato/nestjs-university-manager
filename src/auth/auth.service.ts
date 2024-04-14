import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { JwtUserDto, LocalPayload } from '../common/dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<LocalPayload> {
    const user = await this.usersService.findOneWithPassword({ email });
    if (!user) {
      return null;
    }

    const hashPassword = await hash(password, user.salt);
    if (user.password === hashPassword) {
      const { password, salt, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload: JwtUserDto = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
