import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { type AuthorController } from '../../controllers/authors.controllers/authors.controller';
import { type AuthInterceptor } from '../../middleware/auth.interceptor';

const debug = createDebug('W6*: country router');

export class AuthorRouter {
  router = createRouter();
  constructor(
    private readonly controller: AuthorController,
    private readonly authInterceptor: AuthInterceptor
  ) {
    debug('instantiate author router');

    this.router.post('/register', controller.create.bind(controller));
    this.router.post('/login', controller.login.bind(controller));

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));

    this.router.patch(
      '/:id',
      authInterceptor.checkAuthentication.bind(authInterceptor),
      controller.update.bind(controller)
    );
    this.router.delete(
      '/:id',
      authInterceptor.checkAuthentication.bind(authInterceptor),
      controller.delete.bind(controller)
    );
  }
}
