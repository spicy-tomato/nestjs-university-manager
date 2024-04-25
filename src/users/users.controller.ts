import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import {
  JwtUser,
  Roles,
  SwaggerClass,
  SwaggerMethod,
} from '../common/decorators';
import { JwtUserDto } from '../common/dto';
import { CreateUserDtoValidationPipe } from '../common/pipes';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
@SwaggerClass({ tag: 'users' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(['SystemAdmin', 'Admin'])
  @SwaggerMethod({})
  async createUser(
    @JwtUser() user: JwtUserDto,
    @Body(new CreateUserDtoValidationPipe()) payload: CreateUserDto,
  ) {
    return this.usersService.create(user.role, payload);
  }

  @Get('me')
  @SwaggerMethod({ ok: { type: JwtUserDto } })
  getUserProfile(@Req() req: Request) {
    return this.usersService.findById((req.user as { id: string }).id);
  }
}
