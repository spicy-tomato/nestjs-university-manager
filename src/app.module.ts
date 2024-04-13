import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AcademicYearsModule } from './academic-years/academic-years.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { JwtAuthGuard, RolesGuard } from './common/guards';
import { CoursesModule } from './courses/courses.module';
import { PrismaModule } from './prisma';
import { ProgramsModule } from './programs/programs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: `${configService.get('JWT_SECRET')}`,
          signOptions: { expiresIn: '3h' },
        };
      },
    }),
    PrismaModule,
    PassportModule,
    AcademicYearsModule,
    AuthModule,
    CoursesModule,
    ProgramsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
