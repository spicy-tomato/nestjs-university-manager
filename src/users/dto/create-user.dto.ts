import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class CreateUserProfileTeacherDto {
  @IsNotEmpty()
  teacherId: string;
}

export class CreateUserProfileStudentDto {
  @IsNotEmpty()
  studentId: string;

  @IsNotEmpty()
  @IsMongoId()
  managementClassId: string;
}

export class CreateUserProfileDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ValidateIf((o) => !!o.middleName)
  @IsString()
  middleName?: string | null;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ValidateIf((o) => !!o.phoneNumber)
  @IsString()
  @IsMobilePhone()
  phoneNumber?: string | null;

  @IsBoolean()
  @IsNotEmpty()
  isMale: boolean;

  @ValidateIf((o) => !!o.address)
  @IsString()
  address?: string | null;

  @ValidateNested()
  @Type(() => CreateUserProfileTeacherDto)
  teacher?: CreateUserProfileTeacherDto;

  @ValidateNested()
  @Type(() => CreateUserProfileStudentDto)
  student?: CreateUserProfileStudentDto;
}

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: Role, enumName: 'Role' })
  role: Role;

  @ValidateNested()
  @Type(() => CreateUserProfileDto)
  profile: CreateUserProfileDto;
}
