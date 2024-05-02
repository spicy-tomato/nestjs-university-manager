import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma';
import { ChangeSessionRequestsController } from './change-session-requests.controller';
import { ChangeSessionRequestsService } from './change-session-requests.service';

@Module({
  imports: [PrismaModule],
  providers: [ChangeSessionRequestsService],
  controllers: [ChangeSessionRequestsController],
  exports: [ChangeSessionRequestsService],
})
export class ChangeSessionRequestsModule {}
