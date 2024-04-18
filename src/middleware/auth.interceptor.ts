import createDebug from 'debug';
import { type NextFunction, type Request, type Response } from 'express';
import { HttpError } from './errors.middleware.js';
import { Auth } from '../services/auth.services.js';

const debug = createDebug('W6*:interceptor');

export class AuthInterceptor {
  constructor() {
    debug('Instantiated auth interceptor');
  }

  checkAuthentication(req: Request, res: Response, next: NextFunction) {
    const tokenInitial = req.get('Authorization');

    if (!tokenInitial?.startsWith('Bearer ')) {
      next(new HttpError(498, 'Token expired/invalid', 'Token invalid'));
      return;
    }
    // CONFIRMAMOS A TRAVES DEL HEADERS QUE LA PRIMERA PALABRA COINCIDE CON BEARER PARA SABER QUE ESTA LOGEADO

    const tokenWithoutBearer = tokenInitial?.slice(7);
    // CREAMOS ESTA CONSTANTE PARA UNA VEZ QUE CONFIRMAMOS QUE EXISTE BEARER OLVIDARNOS DE ESA Y SEGUIR CON EL RESTO DEL HEADER QUE ES EL TOKEN, QUE ES LO QUE NOS INTERESA
    try {
      const payload = Auth.verifyJwt(tokenWithoutBearer);
      req.body.payload = payload;
      next();
    } catch (error) {
      next(new HttpError(498, 'Token expired/invalid', 'Token invalid'));
    }
  }
}
