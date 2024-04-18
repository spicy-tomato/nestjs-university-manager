import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export const AutoBearer = () => applyDecorators(ApiBearerAuth('accessToken'));
