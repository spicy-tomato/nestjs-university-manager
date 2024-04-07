import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from '../common/decorators';
import { JwtUserDto } from '../common/dto';
import { LocalAuthGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { AccessToken, LoginModel } from './models';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '', responses: {} })
  @ApiOkResponse({ description: 'Login JWT token', type: AccessToken })
  @ApiBody({ type: LoginModel })
  async login(@Req() req: Request): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @ApiOkResponse({ type: JwtUserDto })
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
