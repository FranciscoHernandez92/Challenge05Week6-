import { type PrismaClient } from '@prisma/client';
import { CountrySqlRepository } from './countries.sql.repo';
import { type CountryCreateDto } from '../../entities/countries/countries';

const mockPrisma = {
  country: {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
  },
} as unknown as PrismaClient;

describe('Given a instance of the class CountrySqlRepository', () => {
  const repo = new CountrySqlRepository(mockPrisma);
  test('then it should be a instance of the class ', () => {
    expect(repo).toBeInstanceOf(CountrySqlRepository);
  });
  describe('When we use the method readAll', () => {
    test('Then it should call prisma.findMany', async () => {
      const result = await repo.readAll();
      expect(mockPrisma.country.findMany).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When we use the method readById with a valid ID', () => {
    test('Then it should call prisma.findUnique', async () => {
      const result = await repo.readById('1');
      expect(mockPrisma.country.findUnique).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });
  describe('When we use the method create', () => {
    test('Then it should call prisma.create', async () => {
      const data = {} as unknown as CountryCreateDto;
      const result = await repo.create(data);

      expect(result).toEqual({});
      expect(mockPrisma.country.create).toHaveBeenCalled();
    });
  });
  describe('When we use the method update with a valid ID', () => {
    test('Then it should call prisma.update', async () => {
      const result = await repo.update('1', {});
      expect(mockPrisma.country.update).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });
  describe('When we use the method delete', () => {
    test('Then it should call prisma.delete', async () => {
      const result = await repo.delete('1');
      expect(mockPrisma.country.delete).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });
});
