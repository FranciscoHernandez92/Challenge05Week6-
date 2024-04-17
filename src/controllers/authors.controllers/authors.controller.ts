import createDebug from 'debug';
import { BaseController } from '../base.controller.js';
import { type Repo } from '../../repositories/type.repo.js';
import {
  type Author,
  type AuthorCreateDto,
} from '../../entities/authors/authors.js';
import {
  authorCreateDtoSchema,
  authorUpdateDtoSchema,
} from '../../entities/authors/authors.schema.js';

const debug = createDebug('W6:country controller');

export class AuthorController extends BaseController<Author, AuthorCreateDto> {
  constructor(protected readonly repo: Repo<Author, AuthorCreateDto>) {
    super(repo, authorCreateDtoSchema, authorUpdateDtoSchema);

    debug('instantiated author controller');
  }
}
