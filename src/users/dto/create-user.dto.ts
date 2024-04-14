import { Role } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

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

  @IsString()
  @IsMobilePhone()
  phoneNumber?: string | null;

  @IsBoolean()
  @IsNotEmpty()
  isMale: boolean;

  @ValidateIf((o) => !!o.address)
  @IsString()
  address?: string | null;
}

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role;

  @ValidateNested()
  @Type(() => CreateUserProfileDto)
  profile: CreateUserProfileDto;
}
