import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { JwtUser, SwaggerClass, SwaggerMethod } from '../common/decorators';
import { JwtUserDto } from './../common/dto/jwt-user.dto';
import { FindSessionDto, SessionDto } from './dto';
import { SessionsService } from './sessions.service';

@Controller('sessions')
@SwaggerClass({ tag: 'sessions' })
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  @SwaggerMethod({ ok: { type: SessionDto, isArray: true } })
  getSessionByCondition(
    @Query() q: FindSessionDto,
    @JwtUser() user: JwtUserDto,
  ) {
    return this.sessionsService.findByCondition(q, user.role, user.sub);
  }

  @Get(':id')
  @SwaggerMethod({ ok: { type: SessionDto, isNullable: true } })
  findOneSession(@Param('id') id: string) {
    return this.sessionsService.findOne(+id);
  }

  @Delete(':id')
  removeSession(@Param('id') id: string) {
    return this.sessionsService.remove(+id);
  }
}
