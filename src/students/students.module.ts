import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma';
import { ScoresModule } from '../scores/students.module';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [PrismaModule, ScoresModule],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports: [StudentsService],
})
export class StudentsModule {}
