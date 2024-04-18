import { type AuthorController } from '../../controllers/authors.controllers/authors.controller';
import { type AuthInterceptor } from '../../middleware/auth.interceptor';
import { AuthorRouter } from './authors.router';

describe('Given a instance of the class AuthorRouter', () => {
  const controller = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    login: jest.fn(),
  } as unknown as AuthorController;
  const interceptor = {
    checkAuthentication: jest.fn(),
  } as unknown as AuthInterceptor;
  const router = new AuthorRouter(controller, interceptor);
  test('Then it should be instance of the class', () => {
    expect(router).toBeInstanceOf(AuthorRouter);
  });
});
