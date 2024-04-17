import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ApiOkResponseGeneric, AutoSummarize, Public } from '../common/decorators';
import { LocalAuthGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { AccessToken } from './models';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @AutoSummarize()
  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiOkResponseGeneric({
    description: 'Login JWT token',
    type: AccessToken,
  })
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }
}
