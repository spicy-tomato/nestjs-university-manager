import { Module } from '@nestjs/common';
import { ChangeSessionRequestsService } from './change-session-requests.service';
import { ChangeSessionRequestsController } from './change-session-requests.controller';

@Module({
  controllers: [ChangeSessionRequestsController],
  providers: [ChangeSessionRequestsService],
})
export class ChangeSessionRequestsModule {}
