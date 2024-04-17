/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import createDebug from 'debug';
import { type NextFunction, type Request, type Response } from 'express';
import type Joi from 'joi';
import { HttpError } from '../middleware/errors.middleware.js';
import { type Repo } from '../repositories/type.repo';

const debug = createDebug('W6:Base controller');

// CREAMOS UN CONTROLLER GENERICO Y LO TIPAMOS COMO EL REPO BASE DE CARACTER GENERICO
// FIJANDONOS EN CADA METODO, VAMOS APLICANDO CADA LETRA EN LA QUE, EN CADA CONTROLLER DE CADA ENDPOINT, SE SUSTITUIRA POR EL TIPO ADECUADO.
// EN EL CONTROLLER DE CADA ENDPOINT EXTENDEMOS LA BASE PASE Y LOS TIPAMOS DE MANERA ESPECIFICA Y LLAMAMOS AL SUPER EN EL CONSTRUCTOR

export abstract class BaseController<T, C> {
  constructor(
    protected readonly repo: Repo<T, C>,
    protected readonly validateCreateDtoSchema: Joi.ObjectSchema<C>,
    protected readonly validateUpdateDtoSchema: Joi.ObjectSchema<C>
  ) {
    debug('instantiated base controller');
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.readAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const result = await this.repo.readById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const data = req.body as C;

    const {
      error,

      value,
    }: { error: Error | undefined; value: C } =
      this.validateCreateDtoSchema.validate(data, { abortEarly: false });
    if (error) {
      next(new HttpError(406, 'Not Acceptable', error.message));
      return;
    }

    try {
      const result = await this.repo.create(data);
      res.status(201);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = req.body as C;
    const { error } = this.validateUpdateDtoSchema.validate(data, {
      abortEarly: false,
    });
    if (error) {
      next(new HttpError(406, 'Not Acceptable', error.message));
      return;
    }

    try {
      const result = await this.repo.update(id, data);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const result = await this.repo.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
