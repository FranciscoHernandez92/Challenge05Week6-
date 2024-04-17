import { type Request, type Response } from 'express';
import { HttpError } from '../../middleware/errors.middleware';
import { type BookSqlRepository } from '../../repositories/books.repo/books.sql.repo';
import { BookController } from './books.controller';

describe('Given a instance of the class BookController', () => {
  const repo = {
    readAll: jest.fn(),
    readById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as BookSqlRepository;

  const req = {} as unknown as Request;
  const res = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new BookController(repo);
  test('Then it should be instance of the class', () => {
    expect(controller).toBeInstanceOf(BookController);
  });

  describe('When we use the method getAll', () => {
    test('Then it should call repo.readAll', async () => {
      (repo.readAll as jest.Mock).mockResolvedValue([]);
      await controller.getAll(req, res, next);
      expect(repo.readAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });

  describe('When we use the method getAll and repo throw an ERROR', () => {
    test('Then it should call repo.readAll and next', async () => {
      const error = new Error('Something went wrong');
      (repo.readAll as jest.Mock).mockRejectedValue(error);
      await controller.getAll(req, res, next);
      expect(repo.readAll).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('When we use the method getById', () => {
    test('Then it should call repo.readById', async () => {
      (repo.readById as jest.Mock).mockResolvedValue({});
      req.params = { id: '1' };
      await controller.getById(req, res, next);
      expect(repo.readById).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith({});
    });
  });

  describe('When we use the method getById and repo throw an ERROR', () => {
    test('Then it should call repo.readById and next', async () => {
      const error = new Error('Something went wrong');
      (repo.readById as jest.Mock).mockRejectedValue(error);
      req.params = { id: '1' };
      await controller.getById(req, res, next);
      expect(repo.readById).toHaveBeenCalledWith('1');
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('When we use the method create', () => {
    test('Then it should call repo.create', async () => {
      const book = {
        name: 'title',
        category: 'title',
        isPartOfSeries: false,
        authorId: 'author',
      };
      req.body = book;
      (repo.create as jest.Mock).mockResolvedValue(book);
      await controller.create(req, res, next);
      expect(repo.create).toHaveBeenCalledWith(book);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(book);
    });
  });

  describe('When we use the method create with INVALID data', () => {
    test('Then it should call next with an error', async () => {
      const book = { name: 'title' };
      req.body = book;
      await controller.create(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new HttpError(406, 'Not Acceptable', 'Something went wrong')
      );
    });
  });

  describe('When we use the method create and repo throw an ERROR', () => {
    test('Then it should call repo.create and next', async () => {
      const error = new Error('Something went wrong');
      (repo.create as jest.Mock).mockRejectedValue(error);
      const book = { name: 'title', category: 'title' };
      req.body = book;
      await controller.create(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('When we use the method update', () => {
    test('Then it should call repo.update', async () => {
      const book = { name: 'title', category: 'title' };
      req.params = { id: '1' };
      req.body = book;
      (repo.update as jest.Mock).mockResolvedValue(book);
      await controller.update(req, res, next);
      expect(repo.update).toHaveBeenCalledWith('1', book);
      expect(res.json).toHaveBeenCalledWith(book);
    });
  });

  describe('When we use the method update with INVALID data', () => {
    test('Then it should call next with an error', async () => {
      const book = { name: 34 };
      req.body = book;
      await controller.update(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new HttpError(406, 'Not Acceptable', 'Something went wrong')
      );
    });
  });

  describe('When we use the method update and repo throw an ERROR', () => {
    test('Then it should call repo.update and next', async () => {
      const error = new Error('Something went wrong');
      (repo.update as jest.Mock).mockRejectedValue(error);
      const book = { name: 'title', category: 1 };
      req.body = book;
      await controller.update(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('When we use the method delete', () => {
    test('Then it should call repo.delete', async () => {
      req.params = { id: '1' };
      (repo.delete as jest.Mock).mockResolvedValue({});
      await controller.delete(req, res, next);
      expect(repo.delete).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith({});
    });
  });

  describe('When we use the method delete and repo throw an ERROR', () => {
    test('Then it should call repo.delete and next', async () => {
      const error = new Error('Something went wrong');
      (repo.delete as jest.Mock).mockRejectedValue(error);
      req.params = { id: '1' };
      await controller.delete(req, res, next);
      expect(repo.delete).toHaveBeenCalledWith('1');
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
