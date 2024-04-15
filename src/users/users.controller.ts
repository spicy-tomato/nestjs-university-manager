import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ApiOkResponseGeneric, Roles } from '../common/decorators';
import { JwtUser } from '../common/decorators/params/auth-user.decorator';
import { JwtUserDto } from '../common/dto';
import { CreateUserDtoValidationPipe } from '../common/pipes';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(['SystemAdmin', 'Admin'])
  async create(
    @JwtUser() user: JwtUserDto,
    @Body(new CreateUserDtoValidationPipe()) payload: CreateUserDto,
  ) {
    return this.usersService.create(user.role, payload);
  }

  @Get('me')
  @ApiOkResponseGeneric({ type: JwtUserDto })
  getProfile(@Req() req: Request) {
    return this.usersService.findById((req.user as { id: string }).id);
  }
}
