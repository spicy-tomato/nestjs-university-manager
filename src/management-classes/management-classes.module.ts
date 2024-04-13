import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma';
import { ManagementClassesController } from './management-classes.controller';
import { ManagementClassesService } from './management-classes.service';

@Module({
  imports: [PrismaModule],
  providers: [ManagementClassesService],
  controllers: [ManagementClassesController],
  exports: [ManagementClassesService],
})
export class ManagementClassesModule {}
