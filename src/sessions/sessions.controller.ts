import { Controller, Get, Param, Query } from '@nestjs/common';
import { JwtUser, SwaggerClass, SwaggerMethod } from '../common/decorators';
import { JwtUserDto } from './../common/dto/jwt-user.dto';
import { FindSessionDto, SessionListItemDto } from './dto';
import { SessionsService } from './sessions.service';

@Controller('sessions')
@SwaggerClass({ tag: 'sessions' })
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  @SwaggerMethod({ ok: { type: SessionListItemDto, isArray: true } })
  getSessionByCondition(
    @Query() q: FindSessionDto,
    @JwtUser() user: JwtUserDto,
  ) {
    return this.sessionsService.findByCondition(q, user.role, user.sub);
  }

  @Get(':id')
  @SwaggerMethod({ ok: { type: SessionListItemDto, isNullable: true } })
  findOneSession(@Param('id') id: string, @JwtUser() user: JwtUserDto) {
    return this.sessionsService.findOne(id, user.role, user.sub);
  }
}
