import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { HttpError } from '../../middleware/errors.middleware.js';
import {
  type SportUpdateDto,
  type SportCreateDto,
} from '../../entities/sports/sport.js';

const debug = createDebug('W6*:repoSql');

export class SportSqlRepository {
  constructor(private readonly prisma: PrismaClient) {
    debug(' hello sql repository');
  }

  async readAll() {
    return this.prisma.sport.findMany({ distinct: ['createAd', 'updateAd'] });
    // CON EL DISTINCT INDICAMOS LOS CAMPOS QUE NO QUEREMOS PARA ESE METODO
  }

  async readById(id: string) {
    const sport = await this.prisma.sport.findUnique({
      where: { id },
      select: { id: true, name: true, isColective: true },
    });
    // CON EL WHERE BUSCAMOS EL QUE CUMPLA LA CONDICION EN ESTE CASO ID = ID
    // CON EL SELECT INDICAMOS LOS CAMPOS QUE QUEREMOS Y LAS MOSTRAMOS

    if (!sport) {
      throw new HttpError(404, 'Not Found', `Sport ${id} not found`);
    }
    // EN VEZ DE ESTE IF PODEMOS UTILIZAR EL METODO .findUniqueOrThrow()

    return sport;
  }

  async create(data: SportCreateDto) {
    return this.prisma.sport.create({
      data,
      select: { name: true, isColective: true },
    });
  }

  async update(id: string, data: SportUpdateDto) {
    const sport = await this.prisma.sport.findUnique({
      where: { id },
    });
    if (!sport) {
      throw new HttpError(404, 'Not Found', `Sport ${id} not found`);
    }

    return this.prisma.sport.update({
      where: { id },
      data,
      select: {
        name: true,
        isColective: true,
      },
    });
  }

  async delete(id: string) {
    const sport = await this.prisma.sport.findUnique({
      where: { id },
    });
    if (!sport) {
      throw new HttpError(404, 'Not Found', `Sport ${id} not found`);
    }

    return this.prisma.sport.delete({
      where: { id },
      select: { name: true },
    });
  }
}
