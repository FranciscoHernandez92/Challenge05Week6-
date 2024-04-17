import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { type AuthorController } from '../../controllers/authors.controllers/authors.controller';

const debug = createDebug('W6*: country router');

export class AuthorRouter {
  router = createRouter();
  constructor(private readonly controller: AuthorController) {
    debug('instantiate author router');
    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
