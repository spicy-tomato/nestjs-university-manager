import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChangeSessionRequestsService } from './change-session-requests.service';
import { CreateChangeSessionRequestDto } from './dto/create-change-session-request.dto';
import { UpdateChangeSessionRequestDto } from './dto/update-change-session-request.dto';

@Controller('change-session-requests')
export class ChangeSessionRequestsController {
  constructor(
    private readonly changeSessionRequestsService: ChangeSessionRequestsService,
  ) {}

  @Post()
  create(@Body() createChangeSessionRequestDto: CreateChangeSessionRequestDto) {
    return this.changeSessionRequestsService.create(
      createChangeSessionRequestDto,
    );
  }

  @Get()
  findAll() {
    return this.changeSessionRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.changeSessionRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChangeSessionRequestDto: UpdateChangeSessionRequestDto,
  ) {
    return this.changeSessionRequestsService.update(
      +id,
      updateChangeSessionRequestDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.changeSessionRequestsService.remove(+id);
  }
}
