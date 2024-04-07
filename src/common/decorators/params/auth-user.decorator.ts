import { createParamDecorator } from '@nestjs/common';
import { JwtPayload } from '../../models';

export const JwtUser = createParamDecorator((_, req) => {
  return req.args[0].user as JwtPayload;
});
