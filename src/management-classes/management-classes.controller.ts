import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AutoBearer, AutoSummarize, Roles } from '../common/decorators';
import {
  CreateManagementClassDto,
  FindManagementClassDto,
  UpdateManagementClassDto,
} from './dto';
import { ManagementClassesService } from './management-classes.service';

@Controller('management-classes')
@ApiTags('management-classes')
@AutoBearer()
export class ManagementClassesController {
  constructor(
    private readonly managementClassService: ManagementClassesService,
  ) {}

  @Post()
  @AutoSummarize()
  @Roles(['Admin'])
  create(@Body() data: CreateManagementClassDto) {
    return this.managementClassService.create(data);
  }

  @Get()
  @AutoSummarize()
  findByCondition(@Query() q: FindManagementClassDto) {
    return this.managementClassService.findByCondition(q);
  }

  @Get(':id')
  @AutoSummarize()
  findOne(@Param('id') id: string) {
    return this.managementClassService.findById(id);
  }

  @Patch(':id')
  @AutoSummarize()
  @Roles(['Admin'])
  update(@Param('id') id: string, @Body() data: UpdateManagementClassDto) {
    return this.managementClassService.update(id, data);
  }

  @Delete(':id')
  @AutoSummarize()
  @Roles(['Admin'])
  remove(@Param('id') id: string) {
    return this.managementClassService.remove(id);
  }
}
