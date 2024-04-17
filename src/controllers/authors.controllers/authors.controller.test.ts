import { HttpError } from '../../middleware/errors.middleware';

import { type Request, type Response } from 'express';
import { type AuthorSqlRepository } from '../../repositories/authors.repo/authors.sql.repo';
import { AuthorController } from './authors.controller';

describe('Given a instance of the class AuthorController', () => {
  const repo = {
    readAll: jest.fn(),
    readById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as AuthorSqlRepository;

  const req = {} as unknown as Request;
  const res = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new AuthorController(repo);
  test('Then it should be instance of the class', () => {
    expect(controller).toBeInstanceOf(AuthorController);
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
      const author = {
        name: 'title',
        nacionality: 'nacionality',
        email: 'email',
        birthDate: new Date(),
      };
      req.body = author;
      (repo.create as jest.Mock).mockResolvedValue(author);
      await controller.create(req, res, next);
      expect(repo.create).toHaveBeenCalledWith(author);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(author);
    });
  });

  describe('When we use the method create with INVALID data', () => {
    test('Then it should call next with an error', async () => {
      const author = { name: 'title' };
      req.body = author;
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
      const author = { name: 'title', email: 2 };
      req.body = author;
      await controller.create(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('When we use the method update', () => {
    test('Then it should call repo.update', async () => {
      const author = { name: 'title', email: 'email' };
      req.params = { id: '1' };
      req.body = author;
      (repo.update as jest.Mock).mockResolvedValue(author);
      await controller.update(req, res, next);
      expect(repo.update).toHaveBeenCalledWith('1', author);
      expect(res.json).toHaveBeenCalledWith(author);
    });
  });

  describe('When we use the method update with INVALID data', () => {
    test('Then it should call next with an error', async () => {
      const author = { name: 34 };
      req.body = author;
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
      const author = { name: 'title', email: 2 };
      req.body = author;
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
