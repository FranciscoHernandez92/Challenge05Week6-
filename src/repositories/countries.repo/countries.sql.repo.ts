import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { HttpError } from '../../middleware/errors.middleware.js';
import {
  type CountryUpdateDto,
  type CountryCreateDto,
} from '../../entities/countries/countries';

const debug = createDebug('W6*:countryRepoSql');

export class CountrySqlRepository {
  constructor(private readonly prisma: PrismaClient) {
    debug(' country sql repository');
  }

  async readAll() {
    return this.prisma.country.findMany({ distinct: ['createAd', 'updateAd'] });
  }

  async readById(id: string) {
    const country = await this.prisma.country.findUnique({
      where: { id },
      select: { id: true, name: true, population: true },
    });
    if (!country) {
      throw new HttpError(404, 'Not Found', `Country ${id} not found`);
    }

    return country;
  }

  async create(data: CountryCreateDto) {
    return this.prisma.country.create({
      data,
      select: { name: true, population: true },
    });
  }

  async update(id: string, data: CountryUpdateDto) {
    const country = await this.prisma.country.findUnique({
      where: { id },
    });
    if (!country) {
      throw new HttpError(404, 'Not Found', `Country ${id} not found`);
    }

    return this.prisma.country.update({
      where: { id },
      data,
      select: { name: true, population: true },
    });
  }

  async delete(id: string) {
    const country = await this.prisma.country.findUnique({
      where: { id },
    });
    if (!country) {
      throw new HttpError(404, 'Not Found', `Country ${id} not found`);
    }

    return this.prisma.country.delete({
      where: { id },
      select: { name: true },
    });
  }
}
