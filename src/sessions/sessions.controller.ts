import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { SwaggerClass, SwaggerMethod } from '../common/decorators';
import { FindSessionDto, SessionDto } from './dto';
import { SessionsService } from './sessions.service';

@Controller('sessions')
@SwaggerClass({ tag: 'sessions' })
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  @SwaggerMethod({ ok: { type: SessionDto, isArray: true } })
  getSessionByCondition(@Query() q: FindSessionDto) {
    return this.sessionsService.findByCondition(q);
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
