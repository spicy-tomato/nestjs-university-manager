import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  ApiOkResponseGeneric,
  AutoSummarize,
  JwtUser,
  Roles,
} from '../common/decorators';
import { JwtUserDto } from '../common/dto';
import { CreateUserDtoValidationPipe } from '../common/pipes';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @AutoSummarize()
  @Roles(['SystemAdmin', 'Admin'])
  async create(
    @JwtUser() user: JwtUserDto,
    @Body(new CreateUserDtoValidationPipe()) payload: CreateUserDto,
  ) {
    return this.usersService.create(user.role, payload);
  }

  @Get('me')
  @AutoSummarize()
  @ApiOkResponseGeneric({ type: JwtUserDto })
  getProfile(@Req() req: Request) {
    return this.usersService.findById((req.user as { id: string }).id);
  }
}
