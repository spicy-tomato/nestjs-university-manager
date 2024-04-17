import { createParamDecorator } from '@nestjs/common';
import { JwtUserDto } from '../../dto';

export const JwtUser = createParamDecorator((_, req) => {
  return req.args[0].user as JwtUserDto;
});
