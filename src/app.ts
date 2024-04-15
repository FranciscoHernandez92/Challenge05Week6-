import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { SportFsRepository } from './repositories/sport.fs.repo.js';
import { SportController } from './controllers/sport.controller.js';
import { SportRouter } from './routers/sport.router.js';
import { ErrorsMiddleware } from './middleware/errors.middleware.js';

export const createApp = () => {
  const app = express();

  app.use(express.json());
  // UTILIZAMOS EXPRESS.JSON PARA INDICAR QUE NUESTRO SERVIDOR(APP) VA A UTILIZAR EXPRESS Y SU METODO JSON PARA LOS ELEMENTOS

  app.use(morgan('dev'));

  app.use(cors());

  app.use(express.static('public'));
  // ACCEDE A LA CARPETA CON EL NOMBRE INDICADO Y LA USA DIRECTAMENTE

  const sportsRepo = new SportFsRepository();
  const sportsController = new SportController(sportsRepo);
  const sportsRouter = new SportRouter(sportsController);
  app.use('/articles', sportsRouter.router);
  // A TRAVES DEL METODO INDICAMOS LA URL Y CON EL SPORTROUTER ACCEDEMOS A LAS DISTINTAS URL QUE VAMOS A UTILIZAR

  const errorsMiddleware = new ErrorsMiddleware();
  app.use(errorsMiddleware.handle.bind(errorsMiddleware));
  // ESTO ES UN MIDDLEWARE DE ERROR A TRAVES DE LA CLASE QUE CREAMOS EN EL ARCHIVO

  return app;
};
