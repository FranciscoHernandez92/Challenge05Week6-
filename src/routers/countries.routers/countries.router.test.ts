import { type CountryController } from '../../controllers/countries.controllers/countries.controller';
import { CountryRouter } from './countries.router';

describe('Given a instance of the class CountryRouter', () => {
  const controller = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as CountryController;
  const router = new CountryRouter(controller);
  test('Then it should be instance of the class', () => {
    expect(router).toBeInstanceOf(CountryRouter);
  });
});
