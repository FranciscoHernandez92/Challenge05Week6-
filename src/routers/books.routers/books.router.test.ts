import { type BookController } from '../../controllers/books.controllers/books.controller';
import { BookRouter } from './books.router';

describe('Given a instance of the class BookRouter', () => {
  const controller = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as BookController;
  const router = new BookRouter(controller);
  test('Then it should be instance of the class', () => {
    expect(router).toBeInstanceOf(BookRouter);
  });
});
