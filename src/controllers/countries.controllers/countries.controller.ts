/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import createDebug from 'debug';
import { type CountrySqlRepository } from '../../repositories/countries.repo/countries.sql.repo';
import { type NextFunction, type Request, type Response } from 'express';
import {
  type Country,
  type CountryCreateDto,
} from '../../entities/countries/countries';
import { HttpError } from '../../middleware/errors.middleware.js';
import {
  countryCreateDtoSchema,
  countryUpdateDtoSchema,
} from '../../entities/countries/countries.schema.js';

const debug = createDebug('W6:country controller');

export class CountryController {
  constructor(private readonly repo: CountrySqlRepository) {
    debug('instantiated country controller');
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
    const data = req.body as Country;

    const {
      error,

      value,
    }: { error: Error | undefined; value: CountryCreateDto } =
      countryCreateDtoSchema.validate(data, { abortEarly: false });
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
    const data = req.body as Country;
    const { error } = countryUpdateDtoSchema.validate(data, {
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
