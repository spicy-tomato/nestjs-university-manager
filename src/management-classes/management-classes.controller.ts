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
import {
  CreateManagementClassDto,
  FindManagementClassDto,
  UpdateManagementClassDto,
} from './dto';
import { ManagementClassesService } from './management-classes.service';

@Controller('management-classes')
export class ManagementClassesController {
  constructor(
    private readonly managementClassService: ManagementClassesService,
  ) {}

  @Post()
  create(@Body() data: CreateManagementClassDto) {
    return this.managementClassService.create(data);
  }

  @Get()
  findByCondition(@Query() q: FindManagementClassDto) {
    return this.managementClassService.findByCondition(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managementClassService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateManagementClassDto) {
    return this.managementClassService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managementClassService.remove(id);
  }
}
