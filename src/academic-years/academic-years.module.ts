import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma';
import { AcademicYearsController } from './academic-years.controller';
import { AcademicYearsService } from './academic-years.service';

@Module({
  imports: [PrismaModule],
  providers: [AcademicYearsService],
  controllers: [AcademicYearsController],
  exports: [AcademicYearsService],
})
export class AcademicYearsModule {}
