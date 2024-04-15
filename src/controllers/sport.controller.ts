/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type NextFunction, type Request, type Response } from 'express';
import { type SportFsRepository } from '../repositories/sport.fs.repo.js';
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
import { type Sport, type SportCreateDto } from '../entities/sport.js';
import {
  sportCreateDtoSchema,
  sportUpdateDtoSchema,
} from '../entities/sport.schema.js';

const debug = createDebug('W6:controller');

export class SportController {
  constructor(private readonly repo: SportFsRepository) {
    debug('instantiated controller');
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
    const data = req.body as Sport;

    const {
      error,

      value,
    }: { error: Error | undefined; value: SportCreateDto } =
      sportCreateDtoSchema.validate(data, { abortEarly: false });
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
    const data = req.body as Sport;
    const { error } = sportUpdateDtoSchema.validate(data, {
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
