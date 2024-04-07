import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtUser } from '../common/decorators/params/auth-user.decorator';
import { JwtAuthGuard } from '../common/guards';
import { JwtPayload } from '../common/models';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @JwtUser() user: JwtPayload,
    @Body() payload: CreateUserDto,
  ) {
    return this.usersService.create(user.role, payload);
  }
}
