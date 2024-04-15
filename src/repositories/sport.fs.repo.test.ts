import { readFile } from 'fs/promises';
import { HttpError } from '../middleware/errors.middleware';
import { SportFsRepository } from './sport.fs.repo';
import { type SportUpdateDto, type SportCreateDto } from '../entities/sport';

jest.mock('fs/promises');

describe('Given a instance of the class SportFsRepository', () => {
  const repo = new SportFsRepository();

  test('Then it should be instance of the class', () => {
    expect(repo).toBeInstanceOf(SportFsRepository);
  });
  describe('When we use the method readAll', () => {
    test('Then it should call readFile', async () => {
      (readFile as jest.Mock).mockResolvedValue('[]');
      const result = await repo.readAll();
      expect(readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When we use the method readById with a valid ID', () => {
    test('Then it should call readFile', async () => {
      (readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      const result = await repo.readById('1');
      expect(readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('When we use the method readById with an invalid ID', () => {
    test('Then it should throw an error', async () => {
      (readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      await expect(repo.readById('2')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Sport 2 not found')
      );
    });
  });

  describe('When we use the method create', () => {
    test('Then it should call readFile and writeFile', async () => {
      (readFile as jest.Mock).mockResolvedValue('[]');
      const data = {} as unknown as SportCreateDto;
      const result = await repo.create(data);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      expect(result).toEqual({ id: expect.any(String) });
      expect(readFile).toHaveBeenCalled();
    });
  });
  describe('When we use the method update with an invalid ID', () => {
    test('Then it should throw an error', async () => {
      (readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      const data = {} as unknown as SportCreateDto;
      await expect(repo.update('2', data)).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Sport 2 not found')
      );
    });
  });

  describe('When we use the method delete', () => {
    test('Then it should call readFile and writeFile', async () => {
      (readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      const result = await repo.delete('1');
      expect(readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('When we use the method delete with an invalid ID', () => {
    test('Then it should throw an error', async () => {
      (readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      await expect(repo.delete('2')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Sport 2 not found')
      );
    });
  });
});
