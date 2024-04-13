import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/decorators';
import { JwtUser } from '../common/decorators/params/auth-user.decorator';
import { JwtUserDto } from '../common/dto';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(['SystemAdmin', 'Admin'])
  async create(@JwtUser() user: JwtUserDto, @Body() payload: CreateUserDto) {
    return this.usersService.create(user.role, payload);
  }
}
