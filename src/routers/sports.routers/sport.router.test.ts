import { type SportController } from '../../controllers/sports.controllers/sport.controller';
import { SportRouter } from './sport.router';

describe('Given a instance of the class ArticlesRouter', () => {
  const controller = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as SportController;
  const router = new SportRouter(controller);
  test('Then it should be instance of the class', () => {
    expect(router).toBeInstanceOf(SportRouter);
  });
});
