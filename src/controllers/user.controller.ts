import { type Request, type Response } from 'express';
import { type UserDto } from '../entities(models)/user';
import createDebug from 'debug';
import { UserMemoryRepository } from '../repositories/user.inmemory.repo.js';

const debug = createDebug('W6*:app');
export class UserController {
  repo: UserMemoryRepository;
  constructor() {
    this.repo = new UserMemoryRepository();
    debug('user controller');
  }

  getAll(req: Request, res: Response) {
    this.repo.readAll();
    res.send('Hello user');
  }

  getById(req: Request, res: Response) {
    const { id } = req.params;
    this.repo.readById(id);
    res.send(`Pasa pendejo numero ${id}`);
  }

  create(req: Request, res: Response) {
    const data = req.body as UserDto;
    this.repo.create(data);
    res.send('Hello nuevo usuario ' + data.name);
  }

  update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body as UserDto;
    this.repo.update(id, data);
    res.send(` Hola retrasado ${id} ahora te llamas ${data.name}`);
  }

  delete(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body as UserDto;
    this.repo.delete(id);
    res.send(` Hasta nunca ${data.name} con id ${id}`);
  }
}
