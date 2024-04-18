import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  ApiOkResponseGeneric,
  ApiUnauthorizedResponseGeneric,
  AutoSummarize,
  Public,
} from '../common/decorators';
import { LocalAuthGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { AccessToken, LoginModel } from './models';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @AutoSummarize()
  @UseGuards(LocalAuthGuard)
  @ApiOkResponseGeneric({
    description: 'Login JWT token',
    type: AccessToken,
  })
  @ApiUnauthorizedResponseGeneric()
  async login(@Req() req: Request, @Body() _: LoginModel) {
    return this.authService.login(req.user);
  }
}
