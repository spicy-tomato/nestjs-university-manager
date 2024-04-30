import { Module } from '@nestjs/common';
import { AcademicYearsModule } from '../academic-years/academic-years.module';
import { PrismaModule } from '../prisma';
import { CourseClassesController } from './course-classes.controller';
import { CourseClassesService } from './course-classes.service';

@Module({
  imports: [PrismaModule, AcademicYearsModule],
  providers: [CourseClassesService],
  controllers: [CourseClassesController],
  exports: [CourseClassesService],
})
export class CourseClassesModule {}
