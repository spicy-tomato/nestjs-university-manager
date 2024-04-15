import { HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../../users/dto';

@Injectable()
export class CreateUserDtoValidationPipe implements PipeTransform {
  transform(value: CreateUserDto) {
    if (value.role === 'SystemAdmin' || value.role === 'Admin') {
      if (value.profile) {
        throw new HttpException('Admin should not be provided profile', 400);
      }
      return value;
    }

    if (value.role === 'Student') {
      if (!value.profile?.student) {
        throw new HttpException('profile.student is required', 400);
      }
      if (value.profile?.teacher) {
        throw new HttpException('profile.teacher should be empty', 400);
      }
      return value;
    }

    if (!value.profile?.teacher) {
      throw new HttpException('profile.teacher is required', 400);
    }
    if (value.profile?.student) {
      throw new HttpException('profile.student should be empty', 400);
    }

    return value;
  }
}
