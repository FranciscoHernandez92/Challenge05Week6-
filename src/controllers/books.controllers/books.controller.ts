import createDebug from 'debug';
import { BaseController } from '../base.controller.js';
import { type Repo } from '../../repositories/type.repo.js';
import { type Book, type BookCreateDto } from '../../entities/books/books.js';
import {
  bookCreateDtoSchema,
  bookUpdateDtoSchema,
} from '../../entities/books/books.schema.js';

const debug = createDebug('W6:controller');

export class BookController extends BaseController<Book, BookCreateDto> {
  constructor(protected readonly repo: Repo<Book, BookCreateDto>) {
    super(repo, bookCreateDtoSchema, bookUpdateDtoSchema);
    debug('instantiated  book controller');
  }
}
