import { Router as router } from 'express';
import { SportController } from '../controllers/sport.controller.js';
import { SportMemoryRepository } from '../repositories/sport.inmemory.repo.js';

export const sportRouter = router();
const sportRepo = new SportMemoryRepository();
const sportController = new SportController(sportRepo);

sportRouter.get('/', sportController.getAll.bind(sportController));

sportRouter.get('/:id', sportController.getById.bind(sportController));

sportRouter.post('/', sportController.create.bind(sportController));

sportRouter.patch('/:id', sportController.update.bind(sportController));

sportRouter.delete('/:id', sportController.delete.bind(sportController));

// EJECUTAMOS EL CRUD A TRAVES DE CADA METODO Y LOS BINDEAMOS
