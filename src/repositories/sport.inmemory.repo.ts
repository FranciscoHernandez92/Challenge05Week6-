import {
  type SportCreateDto,
  type SportUpdateDto,
  type Sport,
} from '../entities/sport.js';
import fs from 'fs';
import createDebug from 'debug';

const debug = createDebug('W6*:server');

export class SportMemoryRepository {
  sports: Sport[] = [];
  constructor() {
    this.loadDataBase();
  }

  loadDataBase() {
    try {
      const data = fs.readFileSync('db.json', { encoding: 'utf-8' });
      // CREAMOS UNA CONSTANTE QUE CON ESE METODO VA A BUSCAR Y LEER EL ARCHIVO CON ESE NOMBRE Y LO VOY A CODIFICAR EN UTF-8
      const jsonData = JSON.parse(data) as Sport[];
      // AQUI PARSEAMOS LA INFORMACION CON EL METODO DE JSON
      this.sports = jsonData;
      // AQUI LLENAMOS LA VARIABLE CREADA EN LA CLASE IGUALANDOLA A LOS DATOS QUE RECIBIMOS
    } catch (error) {
      // AQUI CONTROLAMOS LOS ERRORES
      debug('Error reading data from file:', error);
      this.sports = [];
    }
  }

  saveDataBase() {
    try {
      fs.writeFileSync('db.json', JSON.stringify(this.sports), {
        encoding: 'utf-8',
        // AQUI ESTAMOS ESCRIBIENDO CON EL METODO EN EL ARCHIVO CON EL NOMBRE INDICADO
        // STRINGIFICAMOS LOS DATOS QUE INDICAMOS ENTRE PARENTESIS PARA QUE NO APAREZCAN COMO ARRAY
        // Y LOS CODIFICAMOS
      });
    } catch (error) {
      debug('Error saving data to file:', error);
    }
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
    this.saveDataBase();
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
    this.saveDataBase();
    return newSport;
  }

  delete(id: string) {
    const sport = this.sports.find((item) => item.id === id);
    if (!sport) {
      throw new Error(` sport with id ${id} doesn't exist`);
    }

    this.sports = this.sports.filter((item) => item.id !== id);
    this.saveDataBase();
    return sport;
  }
}
