import { Router as createRouter } from 'express';
import { type SportController } from '../../controllers/sports.controllers/sport.controller.js';
import createDebug from 'debug';

const debug = createDebug('W6*:router');

export class SportRouter {
  router = createRouter();
  constructor(private readonly controller: SportController) {
    debug('instantiated sport router');
    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}

// DESPUES DE CADA METODO INDICAMOS LA URL QUE VAMOS A UTILIZAR PARA CADA METODO
// EJECUTAMOS EL CRUD Y ACCEDEMOS A LOS METODOS DEL REPOSITORIO, LUEGO LO BINDEAMOS
