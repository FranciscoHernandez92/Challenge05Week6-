import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { HttpError } from '../../middleware/errors.middleware.js';
import { type WithLoginRepo } from '../type.repo.js';
import {
  type AuthorCreateDto,
  type Author,
} from '../../entities/authors/authors.js';

const debug = createDebug('W6*:authorRepoSql');

const select = {
  id: true,
  name: true,
  birthDate: true,
  email: true,
  nacionality: true,
  role: true,
  book: {
    select: {
      id: true,
      name: true,
      category: true,
      isPartOfSeries: true,
      authorId: true,
    },
  },
};

export class AuthorSqlRepository
  implements WithLoginRepo<Author, AuthorCreateDto>
{
  constructor(private readonly prisma: PrismaClient) {
    debug(' author sql repository');
  }

  async readAll() {
    return this.prisma.author.findMany({ select });
    // CON EL DISTINCT INDICAMOS LOS CAMPOS QUE NO QUEREMOS PARA ESE METODO
  }

  async readById(id: string) {
    const author = await this.prisma.author.findUnique({
      where: { id },
      select,
    });
    // CON EL WHERE BUSCAMOS EL QUE CUMPLA LA CONDICION EN ESTE CASO ID = ID
    // CON EL SELECT INDICAMOS LOS CAMPOS QUE QUEREMOS Y LAS MOSTRAMOS

    if (!author) {
      throw new HttpError(404, 'Not Found', `Author ${id} not found`);
    }
    // EN VEZ DE ESTE IF PODEMOS UTILIZAR EL METODO .findUniqueOrThrow()

    return author;
  }

  // Aasync find(key: string, value: unknown) {
  //   return this.prisma.author.findMany({
  //     where: {
  //       [key]: value,
  //     },
  //     select,
  //   });
  // ESTE METODO VA A RECIBIR DOS PARAMETROS Y CON EL METODO FINDMANY BUSCA LOS QUE COINCIDAN
  // }

  async searchForLogin(key: 'email' | 'name', value: 'string') {
    if (!['email', 'name'].includes(key)) {
      throw new HttpError(404, 'Not Found', `Invalid query parametters`);
    }

    // CREAMOS UN METODO PARA HACER EL LOGIN QUE VA A RECIBIR DOS PARAMETROS, NOSOTROS INDICAMOS QUE EL PRIMER PARAMETRO KEY COINCIDA CON EMAIL O EL NAME Y EL OTRO VA A SER LA CONTRASEÑA
    // HACEMOS LA GUARDA
    const authorData = await this.prisma.author.findFirst({
      where: {
        [key]: value,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
      },
    });

    if (!authorData) {
      throw new HttpError(404, 'Not Found', `Invalid ${key} or password`);
    }

    return authorData;
  }

  async create(data: AuthorCreateDto) {
    return this.prisma.author.create({
      data,
      select,
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
      select,
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
      select,
    });
  }
}
