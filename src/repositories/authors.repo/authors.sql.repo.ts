import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { HttpError } from '../../middleware/errors.middleware.js';
import { type Repo } from '../type.repo.js';
import {
  type AuthorCreateDto,
  type Author,
} from '../../entities/authors/authors.js';

const debug = createDebug('W6*:authorRepoSql');

export class AuthorSqlRepository implements Repo<Author, AuthorCreateDto> {
  constructor(private readonly prisma: PrismaClient) {
    debug(' author sql repository');
  }

  async readAll() {
    return this.prisma.author.findMany({ distinct: ['createAd', 'updateAd'] });
    // CON EL DISTINCT INDICAMOS LOS CAMPOS QUE NO QUEREMOS PARA ESE METODO
  }

  async readById(id: string) {
    const author = await this.prisma.author.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        birthDate: true,
        email: true,
        nacionality: true,
      },
    });
    // CON EL WHERE BUSCAMOS EL QUE CUMPLA LA CONDICION EN ESTE CASO ID = ID
    // CON EL SELECT INDICAMOS LOS CAMPOS QUE QUEREMOS Y LAS MOSTRAMOS

    if (!author) {
      throw new HttpError(404, 'Not Found', `Author ${id} not found`);
    }
    // EN VEZ DE ESTE IF PODEMOS UTILIZAR EL METODO .findUniqueOrThrow()

    return author;
  }

  async create(data: AuthorCreateDto) {
    return this.prisma.author.create({
      data,
      select: {
        id: true,
        name: true,
        birthDate: true,
        email: true,
        nacionality: true,
      },
    });
  }

  async update(id: string, data: AuthorCreateDto) {
    const author = await this.prisma.author.findUnique({
      where: { id },
    });
    if (!author) {
      throw new HttpError(404, 'Not Found', `Author ${id} not found`);
    }

    return this.prisma.author.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        birthDate: true,
        email: true,
        nacionality: true,
      },
    });
  }

  async delete(id: string) {
    const author = await this.prisma.author.findUnique({
      where: { id },
    });
    if (!author) {
      throw new HttpError(404, 'Not Found', `Author ${id} not found`);
    }

    return this.prisma.author.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        birthDate: true,
        email: true,
        nacionality: true,
      },
    });
  }
}
