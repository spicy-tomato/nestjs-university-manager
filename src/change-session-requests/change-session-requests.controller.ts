import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { Roles, SwaggerClass, SwaggerMethod } from '../common/decorators';
import { ChangeSessionRequestsService } from './change-session-requests.service';
import {
  ChangeSessionRequestDto,
  FindChangeSessionRequestDto,
  UpdateChangeSessionRequestDto,
} from './dto';

@Controller('change-session-requests')
@SwaggerClass({ tag: 'change-session-requests' })
export class ChangeSessionRequestsController {
  constructor(
    private readonly changeSessionRequestsService: ChangeSessionRequestsService,
  ) {}

  @Get()
  @Roles(['Admin'])
  @SwaggerMethod({ ok: { type: ChangeSessionRequestDto, isArray: true } })
  findRequestsByCondition(@Query() q: FindChangeSessionRequestDto) {
    return this.changeSessionRequestsService.findByCondition(q);
  }

  // @Get(':id')
  // findOneRequest(@Param('id') id: string) {
  //   return this.changeSessionRequestsService.findById(id);
  // }

  @Patch(':id')
  @Roles(['Teacher'])
  @SwaggerMethod({
    ok: { type: ChangeSessionRequestDto },
    badRequest: {},
    notFound: {},
  })
  updateRequest(
    @Param('id') id: string,
    @Body() data: UpdateChangeSessionRequestDto,
  ) {
    return this.changeSessionRequestsService.update(id, data);
  }

  @Patch(':id/approve')
  @Roles(['Admin'])
  @SwaggerMethod({
    ok: { type: ChangeSessionRequestDto },
    badRequest: {},
    notFound: {},
  })
  approveRequest(@Param('id') id: string) {
    return this.changeSessionRequestsService.approve(id);
  }

  @Patch(':id/cancel')
  @Roles(['Teacher'])
  @SwaggerMethod({
    ok: { type: ChangeSessionRequestDto },
    badRequest: {},
    notFound: {},
  })
  cancelRequest(@Param('id') id: string) {
    return this.changeSessionRequestsService.cancel(id);
  }

  @Patch(':id/reject')
  @Roles(['Admin'])
  @SwaggerMethod({
    ok: { type: ChangeSessionRequestDto },
    badRequest: {},
    notFound: {},
  })
  rejectRequest(@Param('id') id: string) {
    return this.changeSessionRequestsService.approve(id);
  }
}
