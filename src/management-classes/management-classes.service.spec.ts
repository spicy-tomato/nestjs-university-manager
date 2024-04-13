import { Test, TestingModule } from '@nestjs/testing';
import { ManagementClassesService } from './management-classes.service';

describe('ManagementClassService', () => {
  let service: ManagementClassesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagementClassesService],
    }).compile();

    service = module.get<ManagementClassesService>(ManagementClassesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
