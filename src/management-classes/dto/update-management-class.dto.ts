import { PartialType } from '@nestjs/swagger';
import { CreateManagementClassDto } from './create-management-class.dto';

export class UpdateManagementClassDto extends PartialType(
  CreateManagementClassDto,
) {}
