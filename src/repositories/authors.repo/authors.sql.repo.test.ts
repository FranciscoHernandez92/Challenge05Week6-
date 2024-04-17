import { type PrismaClient } from '@prisma/client';
import { AuthorSqlRepository } from './authors.sql.repo';
import { type AuthorCreateDto } from '../../entities/authors/authors';
import { HttpError } from '../../middleware/errors.middleware';

const mockPrisma = {
  author: {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
  },
} as unknown as PrismaClient;

describe('Given a instance of the class AuthorSqlRepository', () => {
  const repo = new AuthorSqlRepository(mockPrisma);
  test('then it should be a instance of the class ', () => {
    expect(repo).toBeInstanceOf(AuthorSqlRepository);
  });
  describe('When we use the method readAll', () => {
    test('Then it should call prisma.findMany', async () => {
      const result = await repo.readAll();
      expect(mockPrisma.author.findMany).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When we use the method readById with a valid ID', () => {
    test('Then it should call prisma.findUnique', async () => {
      const result = await repo.readById('1');
      expect(mockPrisma.author.findUnique).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });

  describe('When we use the method readById with an invalid id', () => {
    test('Then it should throw an error', async () => {
      (mockPrisma.author.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(repo.readById('1')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Author 1 not found')
      );
    });
  });
  describe('When we use the method create', () => {
    test('Then it should call prisma.create', async () => {
      const data = {} as unknown as AuthorCreateDto;
      const result = await repo.create(data);

      expect(result).toEqual({});
      expect(mockPrisma.author.create).toHaveBeenCalled();
    });
  });
  describe('When we use the method update with a valid ID', () => {
    test('Then it should call prisma.update', async () => {
      const result = await repo.update('1', {
        name: 'title',
        birthDate: new Date(1996, 0, 1),
        nacionality: 'nacionality',
        email: 'email@email.com',
      });
      expect(mockPrisma.author.update).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });

  describe('When we use the method update with an invalid id', () => {
    test('Then it should throw an error', async () => {
      (mockPrisma.author.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(repo.update('1', {} as AuthorCreateDto)).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Author 1 not found')
      );
    });
  });
  describe('When we use the method delete with valid id', () => {
    test('Then it should call prisma.delete', async () => {
      const result = await repo.delete('1');
      expect(mockPrisma.author.delete).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });

  describe('When we use the method delete with an invalid id', () => {
    test('Then it should throw an error', async () => {
      (mockPrisma.author.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(repo.delete('1')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Author 1 not found')
      );
    });
  });
});
