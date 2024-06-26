import { Router as createRouter } from 'express';
import { type BookController } from '../../controllers/books.controllers/books.controller.js';
import createDebug from 'debug';
import { type AuthInterceptor } from '../../middleware/auth.interceptor.js';

const debug = createDebug('W6*:router');

export class BookRouter {
  router = createRouter();
  constructor(
    private readonly controller: BookController,
    private readonly authInterceptor: AuthInterceptor
  ) {
    debug('instantiated book router');
    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post(
      '/',
      authInterceptor.checkAuthentication.bind(authInterceptor),
      controller.create.bind(controller)
    );
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

// DESPUES DE CADA METODO INDICAMOS LA URL QUE VAMOS A UTILIZAR PARA CADA METODO
// EJECUTAMOS EL CRUD Y ACCEDEMOS A LOS METODOS DEL REPOSITORIO, LUEGO LO BINDEAMOS
