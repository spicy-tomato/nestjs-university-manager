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
import { PrismaModule } from './prisma';
import { UsersModule } from './users/users.module';
import { ProgramsModule } from './programs/programs.module';

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
    AuthModule,
    UsersModule,
    PrismaModule,
    PassportModule,
    AcademicYearsModule,
    ProgramsModule,
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
