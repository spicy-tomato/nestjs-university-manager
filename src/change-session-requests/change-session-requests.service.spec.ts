import { Test, TestingModule } from '@nestjs/testing';
import { ChangeSessionRequestsService } from './change-session-requests.service';

describe('ChangeSessionRequestsService', () => {
  let service: ChangeSessionRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChangeSessionRequestsService],
    }).compile();

    service = module.get<ChangeSessionRequestsService>(
      ChangeSessionRequestsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
