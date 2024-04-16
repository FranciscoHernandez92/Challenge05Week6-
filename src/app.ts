import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { SportController } from './controllers/sports.controllers/sport.controller.js';
import { SportRouter } from './routers/sports.routers/sport.router.js';
import { ErrorsMiddleware } from './middleware/errors.middleware.js';
import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { SportSqlRepository } from './repositories/sports.repo/sports.sql.repo.js';
import { CountrySqlRepository } from './repositories/countries.repo/countries.sql.repo.js';
import { CountryController } from './controllers/countries.controllers/countries.controller.js';
import { CountryRouter } from './routers/countries.routers/countries.router.js';

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

  const sportsRepo = new SportSqlRepository(prisma);
  const sportsController = new SportController(sportsRepo);
  const sportsRouter = new SportRouter(sportsController);
  app.use('/sports', sportsRouter.router);
  // A TRAVES DEL METODO INDICAMOS LA URL Y CON EL SPORTROUTER ACCEDEMOS A LAS DISTINTAS URL QUE VAMOS A UTILIZAR

  const countriesRepo = new CountrySqlRepository(prisma);
  const countriesController = new CountryController(countriesRepo);
  const countriesRouter = new CountryRouter(countriesController);
  app.use('/countries', countriesRouter.router);

  const errorsMiddleware = new ErrorsMiddleware();
  app.use(errorsMiddleware.handle.bind(errorsMiddleware));
  // ESTO ES UN MIDDLEWARE DE ERROR A TRAVES DE LA CLASE QUE CREAMOS EN EL ARCHIVO
};
