import { Test, TestingModule } from '@nestjs/testing';
import { ChangeSessionRequestsController } from './change-session-requests.controller';
import { ChangeSessionRequestsService } from './change-session-requests.service';

describe('ChangeSessionRequestsController', () => {
  let controller: ChangeSessionRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChangeSessionRequestsController],
      providers: [ChangeSessionRequestsService],
    }).compile();

    controller = module.get<ChangeSessionRequestsController>(
      ChangeSessionRequestsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
