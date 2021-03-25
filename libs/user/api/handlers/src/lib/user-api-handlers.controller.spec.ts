import { Test } from '@nestjs/testing';
import { UserApiHandlersController } from './user-api-handlers.controller';

describe('UserApiHandlersController', () => {
  let controller: UserApiHandlersController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [UserApiHandlersController],
    }).compile();

    controller = module.get(UserApiHandlersController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
