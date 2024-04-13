import {
  type SportCreateDto,
  type SportUpdateDto,
  type Sport,
} from '../entities/sport.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
const SPORT: Sport[] = [
  {
    id: '1',
    name: 'tenis',
    isColective: false,
  },
  {
    id: '2',
    name: 'futbol',
    isColective: true,
  },
  {
    id: '3',
    name: 'basket',
    isColective: true,
  },
  {
    id: '4',
    name: 'golf',
    isColective: false,
  },
  {
    id: '5',
    name: 'baseball',
    isColective: true,
  },
];

export class SportMemoryRepository {
  sports = SPORT;

  loadDataBase() {
    try {
    } catch {}
  }

  readAll() {
    return this.sports;
  }

  readById(id: string) {
    return this.sports.find((item) => item.id === id);
    // BUSCAMOS EL DEPORTE A TRAVES DEL ID
  }

  create(data: SportCreateDto) {
    const newSport: Sport = {
      id: (this.sports.length + 1).toString(),
      // CONVERTIMOS EL ID EN STRING PARA LUEGO ACCEDER A EL A TRAVES DE LA URL Y LE SUMAMOS UNO PARA QUE SEA EL SIGUIENTE
      name: data.name,
      isColective: data.isColective,
    };
    this.sports = [...this.sports, newSport];
    return newSport;
  }

  update(id: string, data: SportUpdateDto) {
    const sport = this.sports.find((item) => item.id === id);
    if (!sport) {
      throw new Error(` sport with id ${id} doesn't exist`);
    }
    // METEMOS LA GUARDA PARA QUE ENVIE EL ERROR

    const newSport = { ...sport, ...data };
    this.sports = this.sports.map((item) =>
      item.id === id ? newSport : sport
    );
    return newSport;
  }

  delete(id: string) {
    const sport = this.sports.find((item) => item.id === id);
    if (!sport) {
      throw new Error(` sport with id ${id} doesn't exist`);
    }

    this.sports = this.sports.filter((item) => item.id !== id);
    return sport;
  }
}
