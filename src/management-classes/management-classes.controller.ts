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
import { Roles, SwaggerClass, SwaggerMethod } from '../common/decorators';
import {
  CreateManagementClassDto,
  FindManagementClassDto,
  ManagementClassDto,
  ManagementClassListItemDto,
  UpdateManagementClassDto,
} from './dto';
import { ManagementClassesService } from './management-classes.service';

@Controller('management-classes')
@SwaggerClass({ tag: 'management-classes' })
export class ManagementClassesController {
  constructor(
    private readonly managementClassService: ManagementClassesService,
  ) {}

  @Post()
  @Roles(['Admin'])
  @SwaggerMethod({
    created: { type: ManagementClassListItemDto },
    notFound: {},
    conflict: {},
  })
  createManagementClass(@Body() data: CreateManagementClassDto) {
    return this.managementClassService.create(data);
  }

  @Get()
  @SwaggerMethod({ ok: { type: ManagementClassListItemDto, isArray: true } })
  findManagementClassByCondition(@Query() q: FindManagementClassDto) {
    return this.managementClassService.findByCondition(q);
  }

  @Get(':id')
  @SwaggerMethod({ ok: { type: ManagementClassDto, isNullable: true } })
  findOneManagementClass(@Param('id') id: string) {
    return this.managementClassService.findById(id);
  }

  @Patch(':id')
  @Roles(['Admin'])
  @SwaggerMethod({
    ok: { type: ManagementClassListItemDto },
    notFound: {},
    conflict: {},
  })
  updateManagementClass(
    @Param('id') id: string,
    @Body() data: UpdateManagementClassDto,
  ) {
    return this.managementClassService.update(id, data);
  }

  @Delete(':id')
  @Roles(['Admin'])
  @SwaggerMethod({
    ok: { type: ManagementClassDto },
    notFound: {},
  })
  removeManagementClass(@Param('id') id: string) {
    return this.managementClassService.remove(id);
  }
}
