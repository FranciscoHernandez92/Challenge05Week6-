import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { HttpError } from '../../middleware/errors.middleware.js';
import { type Repo } from '../type.repo.js';
import { type Book, type BookCreateDto } from '../../entities/books/books.js';

const debug = createDebug('W6*:bookRepoSql');

const select = {
  id: true,
  name: true,
  author: {
    select: {
      id: true,
      name: true,
      birthDate: true,
      email: true,
      nacionality: true,
    },
  },
  category: true,
  isPartOfSeries: true,
  authorId: true,
};

export class BookSqlRepository implements Repo<Book, BookCreateDto> {
  constructor(private readonly prisma: PrismaClient) {
    debug(' book sql repository');
  }

  async readAll() {
    const books = this.prisma.book.findMany({ select });
    return books;
  }

  async readById(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      select,
    });
    if (!book) {
      throw new HttpError(404, 'Not Found', `Book ${id} not found`);
    }

    return book;
  }

  async create(data: BookCreateDto) {
    return this.prisma.book.create({
      data,
      select,
    });
  }

  async update(id: string, data: Partial<BookCreateDto>) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      select,
    });
    if (!book) {
      throw new HttpError(404, 'Not Found', `Book ${id} not found`);
    }

    return this.prisma.book.update({
      where: { id },
      data,
      select,
    });
  }

  async delete(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      select,
    });
    if (!book) {
      throw new HttpError(404, 'Not Found', `Book ${id} not found`);
    }

    return this.prisma.book.delete({
      where: { id },
      select,
    });
  }
}
