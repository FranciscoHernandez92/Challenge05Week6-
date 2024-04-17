import { type PrismaClient } from '@prisma/client';
import { BookSqlRepository } from './books.sql.repo';
import { type BookCreateDto } from '../../entities/books/books';
import { HttpError } from '../../middleware/errors.middleware';

const mockPrisma = {
  book: {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
  },
} as unknown as PrismaClient;

describe('Given a instance of the class BookSqlRepository', () => {
  const repo = new BookSqlRepository(mockPrisma);
  test('then it should be a instance of the class ', () => {
    expect(repo).toBeInstanceOf(BookSqlRepository);
  });
  describe('When we use the method readAll', () => {
    test('Then it should call prisma.findMany', async () => {
      const result = await repo.readAll();
      expect(mockPrisma.book.findMany).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When we use the method readById with a valid ID', () => {
    test('Then it should call prisma.findUnique', async () => {
      const result = await repo.readById('1');
      expect(mockPrisma.book.findUnique).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });
  describe('When we use the method readById with an invalid id', () => {
    test('Then it should throw an error', async () => {
      (mockPrisma.book.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(repo.readById('1')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Book 1 not found')
      );
    });
  });
  describe('When we use the method create', () => {
    test('Then it should call prisma.create', async () => {
      const data = {} as unknown as BookCreateDto;
      const result = await repo.create(data);

      expect(result).toEqual({});
      expect(mockPrisma.book.create).toHaveBeenCalled();
    });
  });
  describe('When we use the method update with a valid ID', () => {
    test('Then it should call prisma.update', async () => {
      const result = await repo.update('1', {});
      expect(mockPrisma.book.update).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });
  describe('When we use the method update with an invalid id', () => {
    test('Then it should throw an error', async () => {
      (mockPrisma.book.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(repo.update('1', {})).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Book 1 not found')
      );
    });
  });
  describe('When we use the method delete', () => {
    test('Then it should call prisma.delete', async () => {
      const result = await repo.delete('1');
      expect(mockPrisma.book.delete).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });
  describe('When we use the method delete with an invalid id', () => {
    test('Then it should throw an error', async () => {
      (mockPrisma.book.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(repo.delete('1')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Book 1 not found')
      );
    });
  });
});
