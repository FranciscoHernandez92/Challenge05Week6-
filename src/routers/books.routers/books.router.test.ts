import { type BookController } from '../../controllers/books.controllers/books.controller';
import { type AuthInterceptor } from '../../middleware/auth.interceptor';
import { BookRouter } from './books.router';

describe('Given a instance of the class BookRouter', () => {
  const controller = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as BookController;
  const interceptor = {
    checkAuthentication: jest.fn(),
  } as unknown as AuthInterceptor;
  const router = new BookRouter(controller, interceptor);
  test('Then it should be instance of the class', () => {
    expect(router).toBeInstanceOf(BookRouter);
  });
});
