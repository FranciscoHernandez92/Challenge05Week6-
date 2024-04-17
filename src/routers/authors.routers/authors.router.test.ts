import { type AuthorController } from '../../controllers/authors.controllers/authors.controller';
import { AuthorRouter } from './authors.router';

describe('Given a instance of the class AuthorRouter', () => {
  const controller = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as AuthorController;
  const router = new AuthorRouter(controller);
  test('Then it should be instance of the class', () => {
    expect(router).toBeInstanceOf(AuthorRouter);
  });
});
