import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { ErrorsMiddleware } from './middleware/errors.middleware.js';
import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { AuthorSqlRepository } from './repositories/authors.repo/authors.sql.repo.js';
import { AuthorController } from './controllers/authors.controllers/authors.controller.js';
import { AuthorRouter } from './routers/authors.routers/authors.router.js';
import { BookSqlRepository } from './repositories/books.repo/books.sql.repo.js';
import { BookController } from './controllers/books.controllers/books.controller.js';
import { BookRouter } from './routers/books.routers/books.router.js';
import { AuthInterceptor } from './middleware/auth.interceptor.js';

const debug = createDebug('W6*:app');

export const createApp = () => {
  debug('creating app');
  return express();
};

export const startApp = (app: Express, prisma: PrismaClient) => {
  debug('starting app');
  app.use(express.json());
  // UTILIZAMOS EXPRESS.JSON PARA INDICAR QUE NUESTRO SERVIDOR(APP) VA A UTILIZAR EXPRESS Y SU METODO JSON PARA LOS ELEMENTOS

  app.use(morgan('dev'));

  app.use(cors());

  app.use(express.static('public'));
  // ACCEDE A LA CARPETA CON EL NOMBRE INDICADO Y LA USA DIRECTAMENTE

  const authInterceptor = new AuthInterceptor();

  const authorsRepo = new AuthorSqlRepository(prisma);
  // CREAMOS UN REPOSITORIO Y LE PASAMOS EL PARAMETRO QUE ESPERA(QUE ES EL QUE ESPERA TAMBIEN LA FUNCION)
  const authorsController = new AuthorController(authorsRepo);
  // CREAMOS UN CONTROLLER Y LE PASAMOS EL PARAMETRO QUE ESPERA(EL REPOSITORIO)
  const authorsRouter = new AuthorRouter(authorsController, authInterceptor);
  // CREAMOS Un ROUTER Y LE PASAMOS EL PARAMETRO QUE ESPERA(EL CONTROLLER)
  app.use('/authors', authorsRouter.router);
  // A TRAVES DEL METODO INDICAMOS LA URL Y CON EL SPORTROUTER ACCEDEMOS A LAS DISTINTAS URL QUE VAMOS A UTILIZAR

  const booksRepo = new BookSqlRepository(prisma);
  const booksController = new BookController(booksRepo);
  const booksRouter = new BookRouter(booksController, authInterceptor);
  app.use('/books', booksRouter.router);

  const errorsMiddleware = new ErrorsMiddleware();
  app.use(errorsMiddleware.handle.bind(errorsMiddleware));
  // ESTO ES UN MIDDLEWARE DE ERROR A TRAVES DE LA CLASE QUE CREAMOS EN EL ARCHIVO
};
