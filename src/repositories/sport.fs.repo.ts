/* eslint-disable @typescript-eslint/member-ordering */
import {
  type SportCreateDto,
  type SportUpdateDto,
  type Sport,
} from '../entities/sport.js';
import createDebug from 'debug';
import { readFile, writeFile } from 'fs/promises';
import { HttpError } from '../middleware/errors.middleware.js';

const debug = createDebug('W6*:server');

// ESTO ES COMO EL SERVICIO, CREAMOS UNA CLASE Y METEMOS TODOS LOS METODOS QUE VAMOS A UTILIZAR

export class SportFsRepository {
  constructor() {
    debug('Instantiated sport repository');
  }

  private async load(): Promise<Sport[]> {
    const data = await readFile('sports.json', 'utf-8');
    return JSON.parse(data) as Sport[];
  }

  private async save(articles: Sport[]) {
    await writeFile('articles.json', JSON.stringify(articles, null, 2));
  }

  async readAll() {
    const sports = await this.load();
    return sports;
  }

  async readById(id: string) {
    const sports = await this.load();
    const sport = sports.find((sport) => sport.id === id);
    if (!sport) {
      throw new HttpError(404, 'Not Found', `Sport ${id} not found`);
    }

    return sport;
  }

  async create(data: SportCreateDto) {
    const newSport: Sport = {
      id: crypto.randomUUID(),
      ...data,
    };
    let sports = await this.load();
    sports = [...sports, newSport];
    await this.save(sports);
    return newSport;
  }

  async update(id: string, data: SportUpdateDto) {
    let sports = await this.load();
    const sport = sports.find((sport) => sport.id === id);
    if (!sport) {
      throw new HttpError(404, 'Not Found', `Sport ${id} not found`);
    }

    const newSport: Sport = { ...sport, ...data };
    sports = sports.map((sport) => (sport.id === id ? newSport : sport));
    await this.save(sports);
    return newSport;
  }

  async delete(id: string) {
    let sports = await this.load();
    const sport = sports.find((sport) => sport.id === id);
    if (!sport) {
      throw new HttpError(404, 'Not Found', `Sport ${id} not found`);
    }

    sports = sports.filter((sport) => sport.id !== id);
    await this.save(sports);
    return sport;
  }
}
