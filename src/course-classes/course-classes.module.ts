import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma';
import { CourseClassesController } from './course-classes.controller';
import { CourseClassesService } from './course-classes.service';

@Module({
  imports: [PrismaModule],
  providers: [CourseClassesService],
  controllers: [CourseClassesController],
  exports: [CourseClassesService],
})
export class CourseClassesModule {}
