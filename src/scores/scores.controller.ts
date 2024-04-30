import { Controller, Get, Query } from '@nestjs/common';
import {
  JwtUser,
  Roles,
  SwaggerClass,
  SwaggerMethod,
} from '../common/decorators';
import { JwtUserDto } from '../common/dto';
import { StudentScoreDto } from '../students/dto';
import { FindScoreQuery } from './queries';
import { ScoresService } from './scores.service';

@Controller('scores')
@SwaggerClass({ tag: 'scores' })
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get()
  @Roles(['Student'])
  @SwaggerMethod({
    ok: { type: StudentScoreDto, isArray: true },
    notFound: {},
  })
  getMyScores(@Query() q: FindScoreQuery, @JwtUser() user: JwtUserDto) {
    return this.scoresService.findByUserId(user.sub, q);
  }
}
