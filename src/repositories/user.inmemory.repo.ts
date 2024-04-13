import createDebug from 'debug';
import { type UserDto } from '../entities(models)/user.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
const USERS: UserDto[] = [
  {
    id: 1,
    name: 'alice',
    age: 5,
  },
  {
    id: 2,
    name: 'felix',
    age: 6,
  },
  {
    id: 3,
    name: 'juanma',
    age: 7,
  },
];

const debug = createDebug('W6*:app');

// U users = USERS;
export class UserMemoryRepository {
  constructor() {
    debug('Desde tu casa');
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  readAll() {}

  readById(id: string) {
    console.log(` read user ${id}`);
  }

  create(data: any) {
    console.log(` create user ${data}`);
  }

  update(id: string, data: any) {
    console.log(`
    upadte user con id ${id} y ${data}`);
  }

  delete(id: string) {
    console.log(`
    delete ${id}`);
  }
}
