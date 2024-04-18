import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Public, SwaggerClass, SwaggerMethod } from '../common/decorators';
import { LocalAuthGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { AccessToken, LoginModel } from './models';

@Controller('auth')
@SwaggerClass({ tag: 'auth', useAutoBearer: false })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @SwaggerMethod({
    ok: {
      type: AccessToken,
      description: 'Login JWT token',
    },
    unauthorized: {},
  })
  async login(@Req() req: Request, @Body() _: LoginModel) {
    return this.authService.login(req.user);
  }
}
