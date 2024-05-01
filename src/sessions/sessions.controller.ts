import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ChangeSessionRequestDto,
  CreateChangeSessionRequestDto,
} from '../change-session-requests/dto';
import {
  JwtUser,
  Roles,
  SwaggerClass,
  SwaggerMethod,
} from '../common/decorators';
import { JwtUserDto } from './../common/dto/jwt-user.dto';
import { FindSessionDto, SessionDto, SessionListItemDto } from './dto';
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
  @SwaggerMethod({ ok: { type: SessionDto, isNullable: true } })
  findOneSession(@Param('id') id: string, @JwtUser() user: JwtUserDto) {
    return this.sessionsService.findOne(id, user.role, user.sub);
  }

  @Post(':id/change')
  @Roles(['Teacher'])
  @SwaggerMethod({ ok: { type: ChangeSessionRequestDto, isNullable: true } })
  createChangeRequest(
    @Param('id') id: string,
    @Body() data: CreateChangeSessionRequestDto,
  ) {
    return this.sessionsService.createChangeRequest(id, data);
  }
}
