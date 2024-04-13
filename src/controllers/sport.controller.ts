import { type Request, type Response } from 'express';
import { type SportMemoryRepository } from '../repositories/sport.inmemory.repo.js';
import { type Sport } from '../entities/sport.js';

export class SportController {
  constructor(private readonly repo: SportMemoryRepository) {}
  // INYECTAMOS EL REPO COMO EN ANGULAR Y ES READONLY PORQUE SOLAMENTE LO LEEMOS

  getAll(_req: Request, res: Response) {
    const result = this.repo.readAll();
    res.json(result);
  }

  getById(req: Request, res: Response) {
    const { id } = req.params;
    const result = this.repo.readById(id);
    res.json(result);
  }

  create(req: Request, res: Response) {
    const data = req.body as Sport;
    const result = this.repo.create(data);
    res.status(201);
    // INDICAMOS EL STATUS PARA INFORMAR QUE TODO SE CREO CORRECTAMENTE
    res.json(result);
  }

  update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body as Sport;
    const result = this.repo.update(id, data);
    res.status(202);
    // INDICO EL STATUS 202 COMO QUE LA ACTUALIZACION FUE ACEPTADA O PUEDE SER TAMBIEN EL STATUS 205 DE RESETEO
    res.json(result);
  }

  delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = this.repo.delete(id);
    res.json(result);
  }
}
