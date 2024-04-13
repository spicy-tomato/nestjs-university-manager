import { Test, TestingModule } from '@nestjs/testing';
import { ManagementClassesController } from './management-classes.controller';
import { ManagementClassesService } from './management-classes.service';

describe('ManagementClassesController', () => {
  let controller: ManagementClassesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagementClassesController],
      providers: [ManagementClassesService],
    }).compile();

    controller = module.get<ManagementClassesController>(
      ManagementClassesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
