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

export class AuthorController extends BaseController<
  Omit<Author, 'password'>,
  AuthorCreateDto
> {
  constructor(
    protected readonly repo: Repo<Omit<Author, 'password'>, AuthorCreateDto>
  ) // EL OMIT COGE TODAS LAS PROPIEDADES DEL MODEL MENOS LA/LAS QUE INDICAS
  {
    super(repo, authorCreateDtoSchema, authorUpdateDtoSchema);

    debug('instantiated author controller');
  }
}
