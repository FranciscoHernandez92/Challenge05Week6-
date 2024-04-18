import createDebug from 'debug';
import { BaseController } from '../base.controller.js';
import { type WithLoginRepo } from '../../repositories/type.repo.js';
import {
  type Author,
  type AuthorCreateDto,
} from '../../entities/authors/authors.js';
import {
  authorCreateDtoSchema,
  authorUpdateDtoSchema,
} from '../../entities/authors/authors.schema.js';
import { type NextFunction, type Request, type Response } from 'express';
import { HttpError } from '../../middleware/errors.middleware.js';
import { Auth } from '../../services/auth.services.js';

const debug = createDebug('W6:country controller');

export class AuthorController extends BaseController<Author, AuthorCreateDto> {
  constructor(
    protected readonly repo: WithLoginRepo<Author, AuthorCreateDto> // EL OMIT COGE TODAS LAS PROPIEDADES DEL MODEL MENOS LA/LAS QUE INDICAS
  ) {
    super(repo, authorCreateDtoSchema, authorUpdateDtoSchema);

    debug('instantiated author controller');
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, name, password } = req.body as AuthorCreateDto;
    // VAMOS A RECIBIR ESTOS PARAMETROS EN EL BODY QUE SON LOS QUE INDICA EL USUARIO

    if ((!email && !name) || !password) {
      next(
        new HttpError(400, 'Bad request', 'Email and password are required')
      );
      return;
    }
    // SI NO TENEMOS NI EMAIL NI NOMBRE Y TAMPOCO PASSWORD LANZA EL ERROR

    const error = new HttpError(
      401,
      'Unauthorized',
      'Email/name and password invalid'
    );
    try {
      const author = await this.repo.searchForLogin(
        email ? 'email' : 'name',
        email || name
      );
      // CONFIRMAMOS QUE TENGA UNO DE LOS DOS
      if (!author) {
        next(error);
        return;
      }

      // EN CASO CONTRARIO LANZAMOS EL ERROR
      if (!(await Auth.compare(password, author.password!))) {
        next(error);
        return;
      }
      // ACCEDEMOS A AUTH Y COMPARAMOS LAS CONTRASEÑAS

      const token = Auth.signJwt({
        id: author.id!,
        role: author.role!,
      });

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    if (!req.body.password || typeof req.body.password !== 'string') {
      next(new HttpError(400, 'bad request', 'password is required'));
      return;
    }

    req.body.password = await Auth.makeHash(req.body.password as string);

    await super.create(req, res, next);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    if (!req.body.password && typeof req.body.password === 'string') {
      req.body.password = await Auth.makeHash(req.body.password as string);
    }

    await super.update(req, res, next);
  }
}
